import { UserProvider } from '../../context/UserContext';
import { cookies } from 'next/headers';

import Sidebar from '../components/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


    const cookieStore = await cookies();

  // Preparamos los datos iniciales desde el servidor
  const initialUser = {
    token: cookieStore.get('session_token')?.value || ''
  };
 
  return (
    <UserProvider initialUser={initialUser}>
        <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full min-h-screen bg-gray-50 p-8"> {/* ml-64 para dejar espacio al sidebar */}
            {children}
        </div>
        </div>
   </UserProvider>   
  );
}