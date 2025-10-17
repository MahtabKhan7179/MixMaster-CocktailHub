import { Link, Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const value = 'something';

  return (
    <>
      <Navbar/>
      <section className="page">
        {
          isPageLoading ? <div className="loading" /> : <Outlet context={{value}} />
        }
      {/* <Outlet /> */}
      </section>
      <footer>Footer</footer>
    </>
  );
};

export default HomeLayout;
