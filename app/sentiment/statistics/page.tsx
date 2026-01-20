
"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  FaceSmileIcon,
  FaceFrownIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleBottomCenterTextIcon,
  ExclamationCircleIcon,
   ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

//coockies
import { useUser } from '@/context/UserContext';
//import SentimentAnalysisPage from '../sentiment/page';



// 1. Representa cada comentario individual dentro de la lista 'content'
interface SentimentResult {
  id: number;
  comentario: string;
  prevision: 'POSITIVO' | 'NEGATIVO';
  probabilidad: number;
  fecharegistro: string;
}

// 2. Representa el objeto completo que viene del backend (Estadísticas + Lista)
interface SentimentApiResponse {
  total_en_pagina: number;
  positivos: string;
  negativos: string;
  content: SentimentResult[]; // Aquí usamos la interfaz de arriba
  totalElements: number;
  totalPages: number;
  number: number;
}


export default function StatisticsPage() {

  const { user } = useUser();

  const token = user?.token;
  // const token = await cookieStore.get("session_token");
  const [comment, setComment] = useState('');
  //const [results, setResults] = useState<SentimentResult1[]>([]);
  // Ejemplo de uso en el estado
  const [dataResponse, setDataResponse] = useState<SentimentApiResponse | null>(null);
   const [resultado, setResultado] = useState<SentimentResult[]>([]);
  //const [midata, setMidata] = useState<{ total_en_pagina: number; positivos: number; negativos: number } | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'success' | 'error' | null>(null);
  const [dowLoading, setDowloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-dashed border-red-200 p-8 shadow-sm">
        <ExclamationCircleIcon className="h-12 w-12 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-800">No autenticado</h2>
        <p className="text-gray-500 text-center mt-2">
          Tu sesión ha expirado o no has iniciado sesión. Por favor, vuelve a ingresar.
        </p>
        <Link href={`/login`}>

         <button
          // O usa router.push de Next.js
          className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-three transition-colors"
        >
          Ir al Login
        </button>

        </Link>
  
      </div>
    );
  }
  // console.log("tokennnn  ", token)

  ///  INICIO FUNCTION EXPORT CSV

const handleExportCSV = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

// 1. Validar que tengamos datos (usando el nombre de tu variable de estado)
  if (!dataResponse || !dataResponse.content) {
    setMessage("No hay datos para exportar");
    return;
  }

  try {
    setDowloading(true);

    // 2. Definir los encabezados y metadatos
    const headers = ["ID", "   Comentario", "     Prevision", "    Probabilidad", "    Fecha Registro "];
    
    // 3. Crear las filas de metadatos (Resumen)
    let csvContent = `\n RESUMEN DE ANALISIS DE LOS ULTIMOS ${dataResponse.total_en_pagina} COMENTARIOS \n\n `;
    csvContent += ` Total en pagina, ${dataResponse.total_en_pagina}\n`;
    csvContent += ` Positivos, ${dataResponse.positivos}\n`;
    csvContent += ` Negativos, ${dataResponse.negativos}\n\n\n`; // Espacio extra
    
    // 4. Agregar encabezados de la tabla
    csvContent += headers.join(",") + "\n";

    // 5. Mapear los datos del 'content'
    const rows = dataResponse.content.map((item: any) => {
      // Limpiamos el texto: quitamos saltos de línea y escapamos comillas dobles
      const comentarioLimpio = item.comentario.replace(/\n/g, " ").replace(/"/g, '""');
      
      return [
        item.id,
        `"${comentarioLimpio}"`, // Envolvemos en comillas por si hay comas en el texto
        item.prevision,
        item.probabilidad,
        `"${item.fecharegistro}"`
      ].join(",");
    });

    csvContent += rows.join("\n");

    // 6. Crear el archivo (Blob) y descargar
    // Usamos el tipo MIME para CSV y forzamos codificación UTF-8 para las tildes
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `reporte_sentimientos_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setMessage("CSV generado localmente con éxito");
    setUploadStatus('success');

  } catch (err) {
    console.error("Error al generar CSV:", err);
    setMessage("Error al generar el archivo");
    setUploadStatus('error');
  } finally {
    setDowloading(false);
  }
};

  // FIN

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Convertimos el comentario único en el formato de lista que espera tu API
    // Formato: [ { "texto": "valor" } ]
    const dataToAnalyze = [
      { texto: comment }
    ];
    const nunComent = parseInt(comment);
    //console.log("numero de comentarios ", nunComent)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats?size=${nunComent}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Asegúrate de obtener tu token
        },
        // body: JSON.stringify(payload),
      });
      // console.log("payload:: ", payload);

      const data = await response.json();
     // console.log("data  :::  ", data.total_en_pagina)
    //  console.log("data 2 :::  ", data)
       setDataResponse(data);
      setResultado(data?.content);
      //setMidata(data);
    } catch (err: any) {
      // Si el error es de conexión (Servidor apagado)
      if (err.message === "Failed to fetch") {
        setMessage("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        setMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold text-gray-800">Panel de Análisis Estadistico</h1>
        <p className="text-gray-500">Lista comentarios masivos mas recientes guardados en la base de datos.</p>
      </header>



      <section className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">

        {/* SECCIÓN 1: Formulario (Máximo 30% de ancho) */}
        <div className="w-full md:w-[30%] border-r border-gray-100 pr-4">
          <h3 className="text-gray-500 text-sm font-semibold mb-4 uppercase tracking-wider">Numero de registros solicitados</h3>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <input
              type="number"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cantidad de comentarios..."
              className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary outline-none text-gray-700 transition-all shadow-inner"
            />
            <button
              disabled={loading}
              className="w-full bg-linear-to-r from-primary/80 to-three text-white px-6 py-3 rounded-xl
               font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Analizar"}
            </button>
          </form>


          {message && (
            <div className={`mt-6 p-4 rounded-xl flex items-center border `}>
              <span className="text-sm font-semibold">{message}</span>
            </div>
          )}
        </div>

        {/* SECCIÓN 2: Estadísticas (Resto del ancho dividido en 3) */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">

          {/* Card: Total Comentarios */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
            <div className="p-3 bg-blue-100 rounded-full mb-3 text-blue-600">
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
            </div>
            <span className="text-gray-500 text-xs font-medium uppercase">Total Comentarios</span>
            <p className="text-3xl font-bold text-gray-800">{dataResponse?.total_en_pagina ?? 0}</p>
          </div>

          {/* Card: Positivos */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-green-50/50 border border-green-100">
            <div className="p-3 bg-green-100 rounded-full mb-3 text-green-600">
              <FaceSmileIcon className="w-6 h-6" />
            </div>
            <span className="text-gray-500 text-xs font-medium uppercase">Positivos</span>
            <p className="text-3xl font-bold text-green-700">{dataResponse?.positivos}</p>
          </div>

          {/* Card: Negativos */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-red-50/50 border border-red-100">
            <div className="p-3 bg-red-100 rounded-full mb-3 text-red-600">
              <FaceFrownIcon className="w-6 h-6" />
            </div>
            <span className="text-gray-500 text-xs font-medium uppercase">Negativos</span>
            <p className="text-3xl font-bold text-red-700">{dataResponse?.negativos}</p>
          </div>

        </div>
      </section>

      {/* Tabla de Resultados */}
      {resultado?.length > 0 && (
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary" />
              Resultados del Modelo
            </h2>   
             {/* BOTÓN DE EXPORTACIÓN */}
              <button
                onClick={handleExportCSV}
                disabled={dowLoading}
                className="group relative flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary/80 to-three text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all duration-200 active:scale-95 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {dowLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generando...</span>
                  </>
                ) : (
                  <>
                    <ArrowDownTrayIcon className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                    <span>Exportar CSV</span>
                  </>
                )}
              </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Comentario</th>
                  <th className="px-6 py-4 font-semibold text-center">Prevision</th>
                  <th className="px-6 py-4 font-semibold text-center">Probabilidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {resultado?.map((res, index) => (
                  <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 text-gray-700 max-w-md truncate">
                      {res.comentario}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase ${res.prevision === 'POSITIVO'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}>
                        {res.prevision === 'POSITIVO' ? <FaceSmileIcon className="h-4 w-4 mr-1" /> : <FaceFrownIcon className="h-4 w-4 mr-1" />}
                        {res.prevision}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-mono font-bold text-gray-600">
                          {(res.probabilidad * 100).toFixed(1)}%
                        </span>
                        {/* Barra de progreso miniatura */}
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${res.prevision === 'POSITIVO' ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${res.probabilidad * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

//////
