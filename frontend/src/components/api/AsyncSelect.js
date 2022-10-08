import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";

export const SelectAsyncProvinsi = async (params) => {
  return await axios
    .get(`http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
    .then((response) => {
      const data = response.data;
      return data;
    });
};

export const SelectAsyncPaginate = (props) => {
  const [provId, setprovId] = useState("");
  useEffect(() => {
    setprovId(props.regionId);
  }, [props.regionId]);

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    console.log(`loading page:${page} - limit: 10`);
    console.log(provId);
    return await axios
      .get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`
      )
      .then((response) => {
        const data = response.data;

        return {
          options: data,
          hasMore: data.length >= 1,
          additional: {
            page: searchQuery ? 2 : page + 1,
          },
        };
      });
  };

  const onChange = (option) => {
    if (typeof props.onChange === "function") {
      props.onChange(option);
    }
  };

  return (
    <AsyncPaginate
      className="w-full col-span-2"
      key={provId}
      loadOptions={loadOptions}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.name}
      onChange={onChange}
      isSearchable={false}
      placeholder="Kabupaten"
      additional={{
        page: 1,
      }}
    />
  );
};
SelectAsyncPaginate.propTypes = {
  regionName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export const SelectAsyncPaginateKec = (props) => {
  const [kecematanId, setkecematanId] = useState("");
  useEffect(() => {
    setkecematanId(props.kabKotaId);
  }, [props.kabKotaId]);

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    // console.log(`loading page:${page} - limit: 10`);
    return await axios
      .get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/districts/${kecematanId}.json`
      )
      .then((response) => {
        const data = response.data;

        return {
          options: data,
          hasMore: data.length >= 1,
          additional: {
            page: searchQuery ? 2 : page + 1,
          },
        };
      });
  };

  const onChange = (option) => {
    if (typeof props.onChange === "function") {
      props.onChange(option);
    }
  };

  return (
    <AsyncPaginate
      className="w-full col-span-2"
      key={kecematanId}
      isSearchable
      // options={loadOptions}
      loadOptions={loadOptions}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.name}
      onChange={onChange}
      placeholder="Kecematan"
      additional={{
        page: 1,
      }}
    />
  );
};

SelectAsyncPaginateKec.propTypes = {
  regionName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export const SelectAsyncPaginateKel = (props) => {
  const [kelurhanaId, setkelurhanaId] = useState("");
  useEffect(() => {
    setkelurhanaId(props.kelId);
  }, [props.kelId]);
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    console.log(`loading page:${page} - limit: 10`);
    return await axios
      .get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${kelurhanaId}.json`
      )
      .then((response) => {
        const data = response.data;

        return {
          options: data,
          hasMore: data.length >= 1,
          additional: {
            page: searchQuery ? 2 : page + 1,
          },
        };
      });
  };

  const onChange = (option) => {
    if (typeof props.onChange === "function") {
      props.onChange(option);
    }
  };

  return (
    <AsyncPaginate
      className="w-full col-span-2"
      key={kelurhanaId}
      loadOptions={loadOptions}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.name}
      onChange={onChange}
      isSearchable={false}
      placeholder="Kelurahan"
      additional={{
        page: 1,
      }}
    />
  );
};

SelectAsyncPaginateKel.propTypes = {
  regionName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default (SelectAsyncPaginate,
SelectAsyncPaginateKec,
SelectAsyncPaginateKel,
SelectAsyncProvinsi);
