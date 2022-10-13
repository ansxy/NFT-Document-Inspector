import React from "react";
import Footer from "../components/page/Footer";
import NavBarNew from "../components/page/NavBarFunc";
import backgroundSvg from "../bcgr.svg";
import SearchForm from "../components/page/searchForm";
import "../index.css";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.intialState = {};
  }
  render() {
    return (
      <div
        className="flex flex-col h-screen bg-cover"
        style={{ backgroundImage: `url(${backgroundSvg})` }}
      >
        <div className="basis-auto ">
          <NavBarNew />
        </div>
        <div className="basis-auto mt-auto">
          <SearchForm />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }
}
