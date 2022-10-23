import axios from "axios";
import React, { useState } from "react";
import Async from "react-select/async";
import { usePopper } from "react-popper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  SelectAsyncPaginate,
  SelectAsyncPaginateKec,
  SelectAsyncPaginateKel,
  SelectAsyncProvinsi,
} from "../api/AsyncSelect.js";
import moment from "moment/moment.js";

export default function FormSertifikatTanah() {
  // let formData2 = new FormData();
  // formData2 = {
  //   addressWallet: "", // string
  //   pemilik: "", // string
  //   noNik: "", // string
  //   dataSertifikat: {
  //     luas: "", // string
  //     tanggalPengukuran: new Date(), // string
  //     berdasarkan: "", // string
  //     batasan: [], //Array<String>
  //     kewajiban: [], // Array<String>
  //     catatan: "", // string
  //   },
  //   alamat: {
  //     rukunTetangga: "", // string
  //     rukunWarga: "", // string
  //     jalan: "", // string
  //     kelurahan: "", // string
  //     kecamatan: "", // string
  //     kota: "", // string
  //     provinsi: "", // string
  //   }, // Alamat
  //   file: {},
  // };

  // let formAlamat = {
  //   idProv: "",
  //   idKota: "",
  //   idKec: "",
  //   idKel: "",
  // };
  // const [formData, setFormData] = useState(formData2);
  // const [kodeTempat, setkodeTempat] = useState(formAlamat);
  // const [startDate, setStartDate] = useState(new Date());

  // const date = new Date();
  // const today = date.setDate(date.getDate() + 0);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleDate = (e) => {
  //   setFormData({
  //     ...formData,
  //     tanggalLahir: e,
  //   });
  //   setStartDate(e);
  // };

  // const handleImage = (e) => {
  //   setFormData({
  //     ...formData,
  //     file: e.target.files[0],
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const addresWalletEth = new RegExp("^0x[a-fA-F0-9]{40}$/g");
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   if (
  //     moment(formData.tanggalLahir, "dd/MM/YYYY").fromNow().split(" ")[0] <= 16
  //   ) {
  //     console.log("Umur Belum Mencukupi");
  //   }
  //   if (addresWalletEth.test(formData.addressWallet)) {
  //     console.log("tidak valid addres wallet");
  //   } else {
  //     console.log("addressWallet Valid");
  //     // try {
  //     //   await axios.post("http://localhost:3001/api/formktp", formData, config);
  //     // } catch (err) {
  //     //   console.log(err);
  //     // }
  //   }
  // };

  // const onChangeSelect = (item) => {
  //   setFormData({
  //     ...formData,
  //     provinsiKotaLahir: item.name.toUpperCase(),
  //   });
  //   setkodeTempat({
  //     ...kodeTempat,
  //     idProv: item.id,
  //   });
  // };
  // const onChangeSelectKab = (item) => {
  //   setFormData({
  //     ...formData,
  //     kotaLahir: item.name.toUpperCase(),
  //   });
  //   setkodeTempat({
  //     ...kodeTempat,
  //     idKota: item.id,
  //   });
  // };
  // const onChangeSelectKec = (item) => {
  //   setFormData({
  //     ...formData,
  //     kecamatan: item.name.toUpperCase(),
  //     idKecamatan: item.id,
  //   });
  //   setkodeTempat({
  //     ...kodeTempat,
  //     idKec: item.id,
  //   });
  // };
  // const onChangeSelectKel = (item) => {
  //   setFormData({
  //     ...formData,
  //     kelurahan: item.name.toUpperCase(),
  //   });
  //   setkodeTempat({
  //     ...kodeTempat,
  //     idKel: item.id,
  //   });
  // };

  return (
    // <>
    //   <div className="flex basis-full justify-center ">
    //     <div className="flex flex-col w-3/5 justify-start items-center">
    //       <div className="w-full flex items-center justify-center h-auto bg-white rounded-t-lg border-b-2 mt-10">
    //         <h2 className="text-black uppercase text-2xl m-5 font-bold">
    //           Formulir Kartu Tanda Penduduk
    //         </h2>
    //       </div>
    //       <div className="flex flex-auto bg-white w-full h-screen">
    //         <form
    //           onSubmit={handleSubmit}
    //           method="post"
    //           encType="multipart/form-data"
    //           className=" flex-col mr-10 ml-10 mt-10 w-full gap-4"
    //         >
    //           <div className="h-1/6 grid grid-rows-1">
    //             <div className="h-full w-full flex place-items-center justify-center ">
    //               <input
    //                 name="addressWallet"
    //                 id="addressWallet"
    //                 value={formData.addressWallet}
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    //                 rounded-lg col-span-2"
    //                 placeholder="addressWallet"
    //                 onInput={handleChange}
    //                 required
    //               />
    //             </div>
    //           </div>
    //           {/* Section 1 */}
    //           <div className=" grid grid-rows-4 gap-y-4">
    //             {/* Grid 1 in Section 1 */}
    //             <div className="h-full w-full grid grid-cols-4 place-items-center gap-4"></div>
    //             {/* Grid 2 in Section 2 */}
    //             <div className="h-full w-full grid grid-cols-4 place-items-center gap-4"></div>
    //             {/* Grid 4 in Section 2 */}
    //             <div className="w-full grid grid-cols-4 place-items-center gap-4"></div>
    //           </div>
    //           {/* Section 2 */}
    //           <div className=" grid grid-rows-4 gap-y-4">
    //             {/* Grid 1 in Section 2 */}
    //             <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
    //               {/* Alamat */}
    //               <input
    //                 name="alamat"
    //                 type="text"
    //                 id="alamat"
    //                 value={formData.alamat.jalan}
    //                 onChange={handleChange}
    //                 placeholder="Alamat"
    //                 required
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    //                 h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    //                 rounded-lg col-span-2"
    //               />
    //               {/* Rukun Tetangga */}
    //               <input
    //                 name="rukunTetangga"
    //                 type="text"
    //                 id="rt"
    //                 value={formData.rukunTetangga}
    //                 onChange={handleChange}
    //                 placeholder="RT"
    //                 required
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    //                 h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    //                 rounded-lg"
    //               />
    //               {/* Rukun Warga */}
    //               <input
    //                 name="rukunWarga"
    //                 type="text"
    //                 id="rw"
    //                 value={formData.rukunWarga}
    //                 onChange={handleChange}
    //                 placeholder="RW"
    //                 required
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    //                 h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    //                 rounded-lg"
    //               />
    //             </div>
    //             {/* Grid 2 in Section 2 */}
    //             <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
    //               {/* Prov Select */}
    //               <Async
    //                 cacheOptions
    //                 defaultOptions
    //                 className="w-full col-span-2"
    //                 getOptionValue={(e) => e.id}
    //                 getOptionLabel={(e) => e.name}
    //                 onChange={onChangeSelect}
    //                 loadOptions={SelectAsyncProvinsi}
    //               />
    //               <SelectAsyncPaginate
    //                 regionId={kodeTempat.idProv}
    //                 onChange={(kab) => onChangeSelectKab(kab)}
    //               />
    //             </div>
    //             {/* Grid 3 in Section 2 */}
    //             <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
    //               <SelectAsyncPaginateKec
    //                 kabKotaId={kodeTempat.idKota}
    //                 onChange={(kec) => onChangeSelectKec(kec)}
    //               />
    //               <SelectAsyncPaginateKel
    //                 kelId={kodeTempat.idKec}
    //                 onChange={(kel) => onChangeSelectKel(kel)}
    //               />
    //             </div>
    //             {/* Grid 4 in Section 2 */}
    //             <div className="w-full grid grid-cols-4 place-items-center gap-4">
    //               <input
    //                 className="block w-full -p col-span-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
    //                 id="file_input"
    //                 name="foto_ktp"
    //                 accept="image/*"
    //                 type="file"
    //                 onInput={handleImage}
    //               />

    //               <button
    //                 id="dropdownDefault"
    //                 style={{ transition: "all .15s ease" }}
    //                 type="submit"
    //                 value="submit"
    //                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none h-full focus:ring-blue-300 font-medium rounded-lg text-sm text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full col-start-4"
    //               >
    //                 Submit
    //               </button>
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <h1>under development</h1>
    </>
  );
}
