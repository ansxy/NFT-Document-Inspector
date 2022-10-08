import axios from "axios";
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
} from "./BioDataSelect.js";

const listAgama = [
  "ISLAM",
  "KRISTEN KATOLIK",
  "KRISTEN PROTESTAN",
  "HINDU",
  "BUDDHA",
  "KONGHUCU",
  "JAWA",
];
export default function FormKtp() {
  let formData2 = new FormData();
  formData2 = {
    addressWallet: "",
    nama: "",
    kotaLahir: "",
    provinsiKotaLahir: "",
    kecamatan: "",
    idKecamatan: "",
    kelurahan: "",
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
  const [formData, setFormData] = useState(formData2);
  const [kodeTempat, setkodeTempat] = useState(formAlamat);
  const [startDate, setStartDate] = useState(new Date());
  const date = new Date();
  const today = date.setDate(date.getDate() + 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.toUpperCase(),
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
    console.log(formData);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      await axios.post("http://localhost:3001/api/formktp", formData, config);
    } catch (err) {
      console.log(err);
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
      kotaLahir: item.name.toUpperCase(),
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
      <div className="flex flex-grow justify-center ">
        <div className="flex flex-col w-3/5 h-full justify-start items-center">
          <div className="w-full flex items-center justify-center h-auto bg-white rounded-t-lg border-b-2 mt-10">
            <h2 className="text-black uppercase text-2xl m-5 font-bold">
              Formulir Kartu Tanda Penduduk
            </h2>
          </div>
          <div className="flex flex-grow bg-white w-full">
            <form
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
              className="flex-grow flex-col mr-10 ml-10 mt-10 w-full"
            >
              <div className="h-1/6 grid grid-rows-1">
                <div className="h-full w-full flex place-items-center justify-center ">
                  <input
                    name="addressWallet"
                    id="addressWallet"
                    value={formData.addressWallet}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-2/5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg col-span-2"
                    placeholder="addressWallet"
                    onInput={handleChange}
                    required
                  />
                </div>
              </div>
              {/* Section 1 */}
              <div className="h-1/4 grid grid-rows-4 ">
                {/* Grid 1 in Section 1 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  {/* Nama */}
                  <input
                    name="nama"
                    id="nama"
                    value={formData.nama}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg col-span-2"
                    placeholder="Nama"
                    onInput={handleChange}
                    required
                  />
                  {/* Agama Select */}
                  <select
                    name="agama"
                    id="agama"
                    value={formData.agama}
                    onChange={handleChange}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  >
                    <option selected disabled value="">
                      Agama
                    </option>
                    {listAgama.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  {/* Pekerjaan Select */}
                  <select
                    name="pekerjaan"
                    id="pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
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
                {/* Grid 2 in Section 1 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  <div className="relative w-full col-span-2">
                    <DatePicker
                      name="tanggalLahir"
                      selected={startDate}
                      dateFormat="yyyy/MM/dd"
                      maxDate={today}
                      onChange={handleDate}
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
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {/* Jenis Kelamin */}
                  <select
                    name="jenisKelamin"
                    id="Kelamin"
                    value={formData.jenisKelamin}
                    onChange={handleChange}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
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
                  {/* Golongan Darah */}
                  <select
                    name="golonganDarah"
                    id="golonganDarah"
                    value={formData.golonganDarah}
                    onChange={handleChange}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
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
                {/* Grid 3 in Section 1 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  <select
                    name="statusPerkawinan"
                    id="StatusPernikahan"
                    value={formData.statusPerkawinan}
                    onChange={handleChange}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
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
                  <select
                    name="kewarganegaraan"
                    id="KewargaNegaraan"
                    value={formData.kewarganegaraan}
                    onChange={handleChange}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  >
                    <option selected disabled value="">
                      KewargaNegaraan
                    </option>
                    {kewarganegaraan.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Section 2 */}
              <div className="h-1/4 grid grid-rows-4 ">
                {/* Grid 1 in Section 2 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  {/* Alamat */}
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
                    rounded-lg col-span-2"
                  />
                  {/* Rukun Tetangga */}
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
                  {/* Rukun Warga */}
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
                {/* Grid 2 in Section 2 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  {/* Prov Select */}
                  <Async
                    cacheOptions
                    defaultOptions
                    className="w-full col-span-2"
                    getOptionValue={(e) => e.id}
                    getOptionLabel={(e) => e.name}
                    onChange={onChangeSelect}
                    isSearchable
                    loadOptions={SelectAsyncProvinsi}
                  />
                  <SelectAsyncPaginate
                    regionId={kodeTempat.idProv}
                    onChange={(kab) => onChangeSelectKab(kab)}
                  />
                </div>
                {/* Grid 3 in Section 2 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  <SelectAsyncPaginateKec
                    kabKotaId={kodeTempat.idKota}
                    onChange={(kec) => onChangeSelectKec(kec)}
                  />
                  <SelectAsyncPaginateKel
                    kelId={kodeTempat.idKec}
                    onChange={(kel) => onChangeSelectKel(kel)}
                  />
                </div>
                {/* Grid 4 in Section 2 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  <input
                    className="block w-full h-5/6 col-span-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    name="foto_ktp"
                    accept="image/*"
                    type="file"
                    onInput={handleImage}
                  />

                  <button
                    id="dropdownDefault"
                    style={{ transition: "all .15s ease" }}
                    type="submit"
                    value="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-5/6 w-full justify-center  col-start-4"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
