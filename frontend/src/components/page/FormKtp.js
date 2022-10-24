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
    kotaLahir: "",
    tanggalLahir: new Date(),
    statusPerkawinan: "",
    golonganDarah: "",
    kewarganegaraan: "",
    pekerjaan: "",
    kotaAlamatSekarang: "",
    provinsiAlamatSekarang: "",
    kecamatan: "",
    idKecamatan: "",
    kelurahan: "",
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
  const [underAgeStatus, setUnderAgeStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);

  const date = new Date();
  const today = date.setDate(date.getDate() + 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDate = (e) => {
    if (
      moment(formData.tanggalLahir, "dd/MM/YYYY").fromNow().split(" ")[0] <= 16
    ) {
      return setUnderAgeStatus(true);
    }
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

  const rukunTetangga = (e) => {
    if (formData.rukunTetangga.length === 2) {
      return setFormData({
        ...formData,
        rukunTetangga: "0" + formData.rukunTetangga,
      });
    } else if (formData.rukunTetangga.length === 1) {
      return setFormData({
        ...formData,
        rukunTetangga: "00" + formData.rukunTetangga,
      });
    } else {
      return setFormData({
        ...formData,
        rukunTetangga: formData.rukunTetangga,
      });
    }
  };

  const rukunWarga = (e) => {
    if (formData.rukunWarga.length === 2) {
      return setFormData({
        ...formData,
        rukunWarga: "0" + formData.rukunWarga,
      });
    } else if (formData.rukunWarga.length === 1) {
      return setFormData({
        ...formData,
        rukunWarga: "00" + formData.rukunWarga,
      });
    } else {
      return setFormData({
        ...formData,
        rukunWarga: formData.rukunWarga,
      });
    }
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
      return setUnderAgeStatus(true);
    } else if (addresWalletEth.test(formData.addressWallet)) {
      alert("AddressWallet Salah");
    } else if (Object.values(formData).includes("")) {
      alert("Silahkan Isi Form Dengan Benar");
    } else {
      setLoading(false);
      try {
        const ktp = await axios.post(
          `${process.env.REACT_APP_BASE_URL}api/formktp`,
          formData,
          config
        );
        setLoading(true);
        setSuccess(true);
        return ktp;
      } catch (err) {
        setLoading(true);
        alert("AddressWallet Sudah Pernah Didaftarkan");
      }
    }
  };

  const onChangeSelect = (item) => {
    setFormData({
      ...formData,
      provinsiAlamatSekarang: item.name.toUpperCase(),
    });
    setkodeTempat({
      ...kodeTempat,
      idProv: item.id,
    });
  };
  const onChangeSelectKab = (item) => {
    setFormData({
      ...formData,
      kotaAlamatSekarang: item.name.toUpperCase(),
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
    <div className="flex justify-center h-5/6">
      <div className="flex flex-col w-3/5 justify-start items-center">
        <div className="w-full flex items-center justify-center h-auto bg-white rounded-t-lg border-b-2 mt-10">
          <h2 className="text-black uppercase text-2xl m-5 font-bold">
            Formulir Kartu Tanda Penduduk
          </h2>
        </div>
        <div className="flex bg-white w-full min-h-screen">
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
            className=" flex-col mr-10 ml-10 w-full gap-4 mb-80"
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
                    value={formData.nama}
                    onBlur={() => {
                      setFormData({
                        ...formData,
                        nama: formData.nama.toUpperCase(),
                      });
                    }}
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
                    for="agama"
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
                    for="pekerjaan"
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
                    onBlur={() => {
                      setFormData({
                        ...formData,
                        kotaLahir: formData.kotaLahir.toUpperCase(),
                      });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                    placeholder="Kota Lahir"
                    onInput={handleChange}
                    required
                  />
                </div>
                <div className="relative w-full col-span-1">
                  <div className="mb-7 w-full" name="containerTanggal">
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
                      value={formData.tanggalLahir}
                      onInputClick={() => setUnderAgeStatus(false)}
                      showYearDropdown
                      dropdownMode="select"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                       w-full h-5/6 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                      placeholderText="Tanggal Lahir"
                      required
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
                    {!underAgeStatus ? <></> : <></>}
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
                    required
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
                    Golongan Darah
                  </label>
                  <select
                    name="golonganDarah"
                    id="golonganDarah"
                    value={formData.golonganDarah}
                    onChange={handleChange}
                    required
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
                    required
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
                    required
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
                    Alamat
                  </label>
                  <input
                    name="alamat"
                    type="text"
                    id="alamat"
                    value={formData.alamat}
                    onBlur={() => {
                      setFormData({
                        ...formData,
                        alamat: formData.alamat.toUpperCase(),
                      });
                    }}
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
                    for="rukunTetangga"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Rukun Tetangga
                  </label>
                  <input
                    name="rukunTetangga"
                    type="number"
                    id="rt"
                    value={formData.rukunTetangga}
                    onBlur={rukunTetangga}
                    onChange={handleChange}
                    placeholder="Rukun Tetangga"
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
                    type="number"
                    id="rw"
                    value={formData.rukunWarga}
                    onBlur={rukunWarga}
                    onChange={handleChange}
                    placeholder="Rukun Warga"
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
                    placeholder="Provinsi"
                    required
                  />
                </div>
                <div className="mb-6 w-full col-span-2">
                  <label
                    for="Kecamatan"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Kabupaten Sekarang
                  </label>

                  <SelectAsyncPaginate
                    regionId={kodeTempat.idProv}
                    onChange={(kab) => onChangeSelectKab(kab)}
                    required
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
                    required
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
                    required
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
                    required
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
        {loading ? (
          <> </>
        ) : (
          <div class=" overflow-y-auto overflow-x-hidden fixed flex justify-center  backdrop-blur-sm place-items-center md:inset-0 h-modal md:h-full">
            <svg
              class="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        {isSuccess ? (
          <div className="fixed">
            <div
              id="alert-3"
              class="flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200"
              role="alert"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Info</span>
              <div class="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
                Formulir berhasil dikirim
              </div>
              <button
                type="button"
                class="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
                data-dismiss-target="#alert-3"
                onClick={() => setSuccess(false)}
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {modalStatus ? (
        <></>
      ) : (
        <>
          <div
            id="popup-modal"
            class="overflow-y-auto overflow-x-hidden fixed flex justify-center  backdrop-blur-sm place-items-center md:inset-0 h-modal md:h-full"
          >
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Gunakan data dummy untuk mengisi form ini
                  </h3>
                  <button
                    data-modal-toggle="popup-modal"
                    onClick={() => setModalStatus(true)}
                    type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
