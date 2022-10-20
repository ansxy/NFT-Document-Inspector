import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";
import { ethers } from "ethers";
import KtpNFT from "../../contracts/KtpNFT.json";
import KtpNFT_address from "../../contracts/KtpNFT-address.json";
import KtpInspector from "../../contracts/KtpInspector.json";
import KtpInspectorAddress from "../../contracts/KtpInspector-address.json";
import { setNftUri, getImgBytecode } from "../../utils/method";
import axios from "axios";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractKtp = new ethers.Contract(
  KtpNFT_address.KtpNFT,
  KtpNFT.abi,
  signer
);

const contractInspector = new ethers.Contract(
  KtpInspectorAddress.KtpInspector,
  KtpInspector.abi,
  signer
);
console.log(contractInspector);

export default function DetailPage() {
  const data = useLoaderData();
  const [uri, seturi] = useState("");
  const [fotoByte, setFotoByte] = useState("");
  // const [dataKtp, setDataKtp] = useState(fotoktp);
  const mintToken = async (e) => {
    e.preventDefault();
    addFotoKtp()
    await temp();
    const result = await contractKtp.safeMint(data.data.addressWallet, uri);
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      const uri = await setNftUri(data.data.addressWallet, "ktp");
      const imgByteCode = await getImgBytecode(
        data.data.namaFile,
        data.data.tipeMime,
        "ktp"
      );

      return [seturi(uri), setFotoByte(imgByteCode)];
    };
    fetchData();
  }, [data.data.addressWallet, data.data.namaFile, data.data.tipeMime]);

  let fotoktp = new FormData();
  fotoktp = {
    addressWallet: data.data.addressWallet,
    imgString: fotoByte,
  };

  const addFotoKtp = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      return await axios.post(
        "http://localhost:3001/api/fotoktp",
        fotoktp,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const temp = async () => {
    const addUser = contractInspector.addUser(data.data.addressWallet);
    return addUser;
  };

  const nikGenerator = async (e) => {
    if (data.data.jenisKelamin === "LAKI-LAKI") {
      const day = data.data.tanggalLahir.split("-");
      const year = day[0].split("");
      //TODO : Count System
      const nik =
        data.data.idKecamatan + day[2] + day[1] + year[1] + year[2] + "0003";
      return nik;
    } else {
      const day = data.data.tanggalLahir.split("-");
      const womanDay = parseInt(day[2]) + 40;
      const year = day[0].split("");
      const nik =
        data.data.idKecamatan +
        womanDay.toString() +
        day[1] +
        year[1] +
        year[2] +
        "-" +
        "0003";
      return nik;
    }
  };
  const addKtp = async (e) => {
    const addr = data.data.addressWallet;
    const nik = await nikGenerator();
    const result = await contractInspector.addKtp(
      addr,
      KtpNFT_address.KtpNFT,
      nik,
      uri
    );
    await result.wait();
  };

  const findKTP = async (e) => {
    e.preventDefault();
    const addr = await data.data.addressWallet;
    const result = await contractInspector.findKtp(addr);
    return result;
  };
  return (
    <>
      <div className="flex justify-center ">
        <div className="flex flex-col w-3/5 justify-start items-center">
          <div className="w-full flex items-center justify-center h-auto bg-white rounded-t-lg border-b-2 mt-10">
            <h2 className="text-black uppercase text-2xl m-5 font-bold">
              Formulir Kartu Tanda Penduduk
            </h2>
          </div>
          <div className="flex flex-auto bg-white w-full h-screen">
            <div className=" flex-col mr-10 ml-10 mt-10 w-full gap-4">
              <div className="h-1/6 grid grid-rows-1">
                <div className="h-full w-full flex place-items-center justify-center ">
                  <input
                    name="addressWallet"
                    id="addressWallet"
                    value={data.data.addressWallet}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  rounded-lg col-span-2"
                    disabled
                  />
                </div>
              </div>
              {/* Section 1 */}
              <div className=" grid grid-rows-3 gap-y-4 mb-10">
                {/* Grid 1 in Section 1 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  {/* Nama */}
                  <input
                    name="nama"
                    id="nama"
                    disabled
                    value={data.data.nama}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                  h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  rounded-lg col-span-2"
                  />
                  {/* <InputForm
                    name="nama"
                    id="nama"
                    disabled="true"
                    value={data.data.nama}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                  h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  rounded-lg col-span-2"
                  /> */}
                  {/* Agama Select */}
                  <select
                    name="agama"
                    id="agama"
                    disabled
                    value={data.data.agama}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
        h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  >
                    <option selected value={data.data.agama}>
                      {data.data.agama}
                    </option>
                  </select>
                  {/* Pekerjaan Select */}
                  <select
                    name="pekerjaan"
                    id="pekerjaan"
                    value={data.data.pekerjaan}
                    disabled
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
        h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  >
                    <option selected value={data.data.pekerjaan}>
                      {data.data.pekerjaan}
                    </option>
                  </select>
                </div>
                {/* Grid 2 in Section 1 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  <div className="relative w-full col-span-2">
                    <DatePicker
                      name="tanggalLahir"
                      value={data.data.tanggalLahir}
                      dateFormat="dd/MM/yyyy"
                      disabled
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
                  {/* Jenis Kelamin */}
                  <select
                    name="jenisKelamin"
                    id="Kelamin"
                    value={data.data.jenisKelamin}
                    disabled
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  >
                    <option selected value={data.data.jenisKelamin}>
                      {data.data.jenisKelamin}
                    </option>
                  </select>
                  {/* Golongan Darah */}
                  <select
                    name="golonganDarah"
                    id="golonganDarah"
                    value={data.data.golonganDarah}
                    disabled
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  >
                    {" "}
                    <option selected value={data.data.golonganDarah}>
                      {data.data.golonganDarah}
                    </option>
                  </select>
                </div>
                {/* Grid 3 in Section 1 */}
                <div className="w-full grid grid-cols-4 place-items-center gap-4">
                  <select
                    name="statusPerkawinan"
                    id="StatusPernikahan"
                    value={data.data.statusPerkawinan}
                    disabled
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  >
                    {" "}
                    <option selected value={data.data.statusPerkawinan}>
                      {data.data.statusPerkawinan}
                    </option>
                  </select>
                  <select
                    name="kewarganegaraan"
                    id="KewargaNegaraan"
                    value={data.data.kewarganegaraan}
                    disabled
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  >
                    {" "}
                    <option selected value={data.data.kewarganegaraan}>
                      {data.data.kewarganegaraan}
                    </option>
                  </select>
                </div>
              </div>
              {/* Section 2 */}
              <div className=" grid grid-rows-4 gap-y-4">
                {/* Grid 1 in Section 2 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  {/* Alamat */}
                  <input
                    name="alamat"
                    type="text"
                    id="alamat"
                    value={data.data.alamat}
                    placeholder="Alamat"
                    required
                    disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg col-span-2"
                  />
                  {/* Rukun Tetangga */}
                  <input
                    name="rukunTetangga"
                    type="text"
                    id="rt"
                    value={data.data.rukunTetangga}
                    disabled
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
                    value={data.data.rukunWarga}
                    disabled
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
                  <ReactSelect
                    className="w-full col-span-2"
                    isDisabled
                    placeholder={data.data.provinsiKotaLahir}
                  />
                  <ReactSelect
                    className="w-full col-span-2"
                    isDisabled
                    placeholder={data.data.kotaLahir}
                  />
                </div>
                {/* Grid 3 in Section 2 */}
                <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                  <ReactSelect
                    className="w-full col-span-2"
                    isDisabled
                    placeholder={data.data.kecamatan}
                  />
                  <ReactSelect
                    className="w-full col-span-2"
                    isDisabled
                    placeholder={data.data.kelurahan}
                  />
                </div>
                {/* Grid 4 in Section 2 */}
                <div className="w-full grid grid-cols-4 place-items-center gap-4">
                  <button
                    id="dropdownDefault"
                    style={{ transition: "all .15s ease" }}
                    onClick={mintToken}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none h-full focus:ring-blue-300 font-medium rounded-lg text-sm text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full col-start-4"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <img
                className="w-36 h-36"
                src={
                  process.env.REACT_APP_BASE_URL +
                  data.data.addressWallet +
                  ".jpg"
                }
                alt="test"
              />
              <button onClick={addFotoKtp}>encrypt</button>
              <br />
              <button onClick={nikGenerator}>GetIPFS</button>
              <br />
              <button
                onClick={
                  // findKTP
                  addKtp
                }
              >
                ADD KTP
              </button>
              <br />
              <button onClick={findKTP}>Find KTP</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
