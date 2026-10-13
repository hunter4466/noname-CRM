import { redirect } from 'next/navigation';
import { Route } from '@/types/Route';

const HomePage = () => redirect(Route.Register);

export default HomePage;
