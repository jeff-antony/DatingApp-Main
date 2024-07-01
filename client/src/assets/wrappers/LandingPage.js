import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
height: 100vh;
align-items: center;
justify-content: center;
background-color: #DEE4EA;

/* .background {
  flex: 1;
  background-image: url('/images/avatar1.jpg');
  background-size: cover;
  background-position: center;
} */

.form-container {
  flex: 1;
  max-width: 400px;
  /* display: flex; */
  align-items: center; 
   justify-content: center;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.sign-up-form {
  width: 100%;
}

.form-header {
  margin-bottom: 20px;
  text-align: center;
}

.social-buttons {
  margin-bottom: 20px;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.or-separator {
  margin: 20px 0;
  text-align: center;
  font-size: 1rem;
  color: #666;
}

.form-footer {
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  flex-direction: column;

  .background {
    display: none;
  }

  .form-container {
    flex: 1;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
}
`;
export default Wrapper;






// import styled from 'styled-components';

// const Wrapper = styled.section`
//   nav {
//     width: var(--fluid-width);
//     max-width: var(--max-width);
//     margin: 0 auto;
//     height: var(--nav-height);
//     display: flex;
//     align-items: center;
//   }
//   .page {
//     min-height: calc(100vh - var(--nav-height));
//     display: grid;
//     align-items: center;
//     margin-top: -3rem;
//   }
//   h1 {
//     font-weight: 700;
//     span {
//       color: var(--primary-500);
//     }
//     margin-bottom: 1.5rem;
//   }
//   p {
//     line-height: 2;
//     color: var(--text-secondary-color);
//     margin-bottom: 1.5rem;
//     max-width: 35em;
//   }
//   .register-link {
//     margin-right: 1rem;
//   }
//   .main-img {
//     display: none;
//   }
//   .btn {
//     padding: 0.75rem 1rem;
//   }
//   @media (min-width: 992px) {
//     .page {
//       grid-template-columns: 1fr 400px;
//       column-gap: 3rem;
//     }
//     .main-img {
//       display: block;
//     }
//   }
// `;
// export default Wrapper;


// src/wrapper/landingPage.js
// import styled from 'styled-components';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #fff;
// `;

// export const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   padding: 20px;
//   background-color: #fff;
// `;

// export const Logo = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   color: #f06292;
// `;

// export const Nav = styled.nav`
//   display: flex;
//   gap: 20px;
// `;

// export const NavLink = styled.a`
//   text-decoration: none;
//   color: #333;
//   font-weight: bold;

//   &:hover {
//     color: #f06292;
//   }
// `;

// export const Main = styled.main`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 40px 0;
//   background-color: #f5f5f5;
//   width: 100%;
// `;

// export const Title = styled.h1`
//   font-size: 48px;
//   text-align: center;
//   color: #333;
// `;

// export const Highlight = styled.span`
//   color: #f06292;
// `;

// export const Subtitle = styled.p`
//   font-size: 18px;
//   text-align: center;
//   color: #666;
//   max-width: 600px;
//   margin: 20px 0;
// `;

// export const UserCard = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   margin-top: 20px;
// `;

// export const UserInfo = styled.div`
//   margin-left: 20px;
// `;

// export const UserName = styled.h2`
//   font-size: 24px;
//   margin: 0;
// `;

// export const UserLocation = styled.p`
//   font-size: 14px;
//   color: #666;
// `;

// export const SayHiButton = styled.button`
//   background-color: #f06292;
//   color: #fff;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #e91e63;
//   }
// `;
