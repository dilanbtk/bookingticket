import '../styles/globals.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="flex items-center justify-between p-6 bg-gray-800 text-white">
        <div className="text-lg font-bold">
          Ticket Booking
        </div>
        <div className="flex space-x-4">
        <Link href="/" legacyBehavior>
            <a className="hover:underline">Home</a>
          </Link>
          <Link href="/admin" legacyBehavior>
            <a className="hover:underline">Admin</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

