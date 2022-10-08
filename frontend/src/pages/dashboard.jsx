import React from "react";
import Footer from "../components/page/Footer";
import Navbar from "../components/page/NavBar";
import NavBarNew from "../components/page/NavBarFunc";
import SearchForm from "../components/page/searchForm";
import "../index.css";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.intialState = {};
  }
  render() {
    return (
      <div className="flex flex-col h-screen justify-between bg-cyan-300">
        <NavBarNew />
        <SearchForm />
        <Footer />
      </div>
    );
  }
}
