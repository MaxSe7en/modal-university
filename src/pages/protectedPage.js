// // pages/protectedPage.js
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

const ProtectedPage = () => {
//   const { studentDetails } = useForm();
//   const router = useRouter();

//   useEffect(() => {
//     if (!studentDetails.phoneNumber || !studentDetails.id) {
//       router.push('/login'); // Redirect to login page if studentDetails is empty
//     }
//   }, [studentDetails, router]);

//   // Render protected content if studentDetails is populated
//   if (!studentDetails.phoneNumber || !studentDetails.id) {
//     return null; // or a loading spinner
//   }

  return <div>Protected Content</div>;
};

// export const getServerSideProps = async (context) => {
//   // Fetch studentDetails from a cookie, session, or database here
//   const studentDetails = {
//     phoneNumber: "",
//     id: "",
//   };

//   if (!studentDetails.phoneNumber || !studentDetails.id) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { studentDetails },
//   };
// };

export default ProtectedPage;
