import { getSession } from 'next-auth/react';

export default function AdminDashboard({ user }) {
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      {user.isAdmin ? <p>You are an admin.</p> : <p>You are not an admin.</p>}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  /* if (!session?.user || !session.user.isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } */

  return {
    props: {
      user: session.user,
    },
  };
}
