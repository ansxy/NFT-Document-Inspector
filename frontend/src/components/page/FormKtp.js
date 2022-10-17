import React, { useState } from "react";
import Async from "react-select/async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  SelectAsyncPaginate,
  SelectAsyncPaginateKec,
  SelectAsyncPaginateKel,
  SelectAsyncProvinsi,
} from "../api/AsyncSelect.js";
import {
  listPekerjaan,
  jenisKelamin,
  golonganDarah,
  statusPerkawinan,
  kewarganegaraan,
  listAgama,
} from "./BioDataSelect.js";
import moment from "moment/moment.js";
import axios from "axios";

export default function FormKtp() {
  let data = new FormData();
  data = {
    addressWallet: "",
    nama: "",
    kotaSekarang: "",
    provinsiSekarang: "",
    kecamatan: "",
    idKecamatan: "",
    kelurahan: "",
    kotaLahir: "",
    tanggalLahir: new Date(),
    statusPerkawinan: "",
    golonganDarah: "",
    kewarganegaraan: "",
    pekerjaan: "",
    alamat: "",
    rukunTetangga: "",
    rukunWarga: "",
    berlakuHingga: "SEUMUR HIDUP",
    statusValidasi: "DIPROSES",
    jenisKelamin: "",
    file: "",
  };

  let formAlamat = {
    idProv: "",
    idKota: "",
    idKec: "",
    idKel: "",
  };

  const [formData, setFormData] = useState(data);
  const [kodeTempat, setkodeTempat] = useState(formAlamat);
  const [startDate, setStartDate] = useState(new Date());

  const date = new Date();
  const today = date.setDate(date.getDate() + 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDate = (e) => {
    setFormData({
      ...formData,
      tanggalLahir: e,
    });
    setStartDate(e);
  };

  const handleImage = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addresWalletEth = new RegExp("^0x[a-fA-F0-9]{40}$/g");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (
      moment(formData.tanggalLahir, "dd/MM/YYYY").fromNow().split(" ")[0] <= 16
    ) {
      alert("Umur Belum Mencukupi");
    }
    if (addresWalletEth.test(formData.addressWallet)) {
      alert("AddressWallet Salah");
    }
    if (Object.values(formData).includes("")) {
      alert("Silahkan Isi Form Dengan Benar");
    } else {
      try {
        return await axios.post(
          "http://localhost:3001/api/formktp",
          formData,
          config
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onChangeSelect = (item) => {
    setFormData({
      ...formData,
      provinsiKotaLahir: item.name.toUpperCase(),
    });
    setkodeTempat({
      ...kodeTempat,
      idProv: item.id,
    });
  };
  const onChangeSelectKab = (item) => {
    setFormData({
      ...formData,
      kotaSekarang: item.name.toUpperCase(),
    });
    setkodeTempat({
      ...kodeTempat,
      idKota: item.id,
    });
  };
  const onChangeSelectKec = (item) => {
    setFormData({
      ...formData,
      kecamatan: item.name.toUpperCase(),
      idKecamatan: item.id,
    });
    setkodeTempat({
      ...kodeTempat,
      idKec: item.id,
    });
  };
  const onChangeSelectKel = (item) => {
    setFormData({
      ...formData,
      kelurahan: item.name.toUpperCase(),
    });
    setkodeTempat({
      ...kodeTempat,
      idKel: item.id,
    });
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-3/5 justify-start items-center">
          <div className="w-full flex items-center justify-center h-auto bg-white rounded-t-lg border-b-2 mt-10">
            <h2 className="text-black uppercase text-2xl m-5 font-bold">
              Formulir Kartu Tanda Penduduk
            </h2>
          </div>
          <div className="flex bg-white w-full overflow-auto">
            <form
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
              className=" flex-col mr-10 ml-10  w-full gap-4"
            >
              <div className="h-1/6 grid grid-rows-1">
                <div className="h-full w-full flex flex-col justify-center ">
                  <label
                    for="addressWallet"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Address Wallet
                  </label>
                  <input
                    name="addressWallet"
                    id="addressWallet"
                    value={formData.addressWallet}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg col-span-2"
                    placeholder="addressWallet"
                    onInput={handleChange}
                    required
                  />
                </div>
              </div>
              {/* Section 1 */}
              <div className=" grid grid-rows-3 gap-y-4 mb-10">
                {/* Grid 1 in Section 1 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  {/* Nama */}
                  <div class="mb-6 col-span-2 w-full">
                    <label
                      for="nama"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Nama
                    </label>
                    <input
                      name="nama"
                      id="nama"
                      value={formData.nama}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                      placeholder="Nama"
                      onInput={handleChange}
                      required
                    />
                  </div>
                  {/* Agama Select */}
                  <div className="mb-6 w-full">
                    <label
                      for="addressWallet"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Agama
                    </label>
                    <select
                      name="agama"
                      id="agama"
                      value={formData.agama}
                      onChange={handleChange}
                      required
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    >
                      <option selected disabled value=" ">
                        Agama
                      </option>
                      {listAgama.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Pekerjaan Select */}
                  <div className="mb-6 w-full">
                    <label
                      for="addressWallet"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Pekerjaan
                    </label>
                    <select
                      name="pekerjaan"
                      id="pekerjaan"
                      value={formData.pekerjaan}
                      onChange={handleChange}
                      required
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    >
                      <option
                        selected={formData.pekerjaan === ""}
                        disabled
                        value=""
                      >
                        Pekerjaan
                      </option>
                      {listPekerjaan.map((e) => (
                        <option
                          key={e}
                          value={e}
                          selected={formData.pekerjaan === e}
                        >
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Grid 2 in Section 1 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  <div className="mb-7 w-full">
                    <label
                      for="kotaLahir"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Kota Lahir
                    </label>
                    <input
                      name="kotaLahir"
                      id="kotaLahir"
                      value={formData.kotaLahir}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                      placeholder="Kota Lahir"
                      onInput={handleChange}
                      required
                    />
                  </div>
                  <div className="relative w-full col-span-1">
                    <div className="mb-7 w-full">
                      <label
                        for="tanggalLahir"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Tanggal Lahir
                      </label>
                      <DatePicker
                        name="tanggalLahir"
                        selected={startDate}
                        dateFormat="yyyy/MM/dd"
                        maxDate={today}
                        onChange={handleDate}
                        showYearDropdown
                        dropdownMode="select"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                       w-full h-5/6 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                        placeholderText="Tanggal Lahir"
                      />

                      <div className="flex absolute inset-y-0 left-0 items-center p-2.5 gap-4 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Jenis Kelamin */}
                  <div className="mb-7 w-full">
                    <label
                      for="jenisKelamin"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Jenis Kelamin
                    </label>
                    <select
                      name="jenisKelamin"
                      id="Kelamin"
                      value={formData.jenisKelamin}
                      onChange={handleChange}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    >
                      <option selected disabled value="">
                        Kelamin
                      </option>
                      {jenisKelamin.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Golongan Darah */}
                  <div className="mb-7 w-full">
                    <label
                      for="golonganDarah"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Golongan Dara
                    </label>
                    <select
                      name="golonganDarah"
                      id="golonganDarah"
                      value={formData.golonganDarah}
                      onChange={handleChange}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    >
                      <option disabled={true} value="">
                        Golongan Darah
                      </option>
                      {golonganDarah.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Grid 3 in Section 1 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  <div className="mb-6 w-full">
                    <label
                      for="statusPerkawinan"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Status Perkawinan
                    </label>
                    <select
                      name="statusPerkawinan"
                      id="StatusPernikahan"
                      value={formData.statusPerkawinan}
                      onChange={handleChange}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    >
                      <option disabled value="">
                        Status Pernikahan
                      </option>
                      {statusPerkawinan.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-6 w-full">
                    <label
                      for="kewarganegaraan"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Kewarganegaraan
                    </label>
                    <select
                      name="kewarganegaraan"
                      id="KewargaNegaraan"
                      value={formData.kewarganegaraan}
                      onChange={handleChange}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    >
                      <option selected disabled value="">
                        Kewarganegaraan
                      </option>
                      {kewarganegaraan.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Section 2 */}
              <div className=" grid grid-rows-4 gap-y-4">
                {/* Grid 1 in Section 2 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  {/* Alamat */}
                  <div className="mb-6 w-full col-span-2">
                    <label
                      for="statusPerkawinan"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Status Perkawinan
                    </label>
                    <input
                      name="alamat"
                      type="text"
                      id="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                      placeholder="Alamat"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                    />
                  </div>
                  {/* Rukun Tetangga */}
                  <div className="mb-6 w-full">
                    <label
                      for="statusPerkawinan"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Rukun Tetangga
                    </label>
                    <input
                      name="rukunTetangga"
                      type="text"
                      id="rt"
                      value={formData.rukunTetangga}
                      onChange={handleChange}
                      placeholder="RT"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg"
                    />
                  </div>
                  {/* Rukun Warga */}
                  <div className="mb-6 w-full">
                    <label
                      for="rukunWarga"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Rukun Warga
                    </label>
                    <input
                      name="rukunWarga"
                      type="text"
                      id="rw"
                      value={formData.rukunWarga}
                      onChange={handleChange}
                      placeholder="RW"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg"
                    />
                  </div>
                </div>
                {/* Grid 2 in Section 2 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  {/* Prov Select */}
                  <div className="mb-6 w-full col-span-2">
                    <label
                      for="Provinsi"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Provinsi Sekarang
                    </label>
                    <Async
                      cacheOptions
                      defaultOptions
                      getOptionValue={(e) => e.id}
                      getOptionLabel={(e) => e.name}
                      onChange={onChangeSelect}
                      loadOptions={SelectAsyncProvinsi}
                    />
                  </div>
                  <div className="mb-6 w-full col-span-2">
                    <label
                      for="Kecematan"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Kecematan Sekarang
                    </label>

                    <SelectAsyncPaginate
                      regionId={kodeTempat.idProv}
                      onChange={(kab) => onChangeSelectKab(kab)}
                    />
                  </div>
                </div>
                {/* Grid 3 in Section 2 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  <div className="mb-6 w-full col-span-2">
                    {" "}
                    <label
                      for="Kecamatan"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Kecamatan Sekarang
                    </label>
                    <SelectAsyncPaginateKec
                      kabKotaId={kodeTempat.idKota}
                      onChange={(kec) => onChangeSelectKec(kec)}
                    />
                  </div>
                  <div className="mb-6 w-full col-span-2">
                    {" "}
                    <label
                      for="Kelurahan"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Kelurahan Sekarang
                    </label>
                    <SelectAsyncPaginateKel
                      kelId={kodeTempat.idKec}
                      onChange={(kel) => onChangeSelectKel(kel)}
                    />
                  </div>
                </div>
                {/* Grid 4 in Section 2 */}
                <div className="w-full grid grid-cols-4 place-items-center gap-4">
                  <div className="mb-6 w-full col-span-2">
                    <label
                      for="foto"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Foto 3x4
                    </label>
                    <input
                      className="block w-full -p text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      name="foto_ktp"
                      accept="image/*"
                      type="file"
                      onInput={handleImage}
                    />
                  </div>
                  <div className="w-full h-full col-start-4 flex place-items-center">
                    <button
                      id="dropdownDefault"
                      style={{ transition: "all .15s ease" }}
                      type="submit"
                      value="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full h-1/2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
