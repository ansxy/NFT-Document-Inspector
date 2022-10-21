const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class FotoKtp extends Model { }

FotoKtp.init({
  addressWallet: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Tolong masukkan address wallet anda!",
      },
      len: {
        args: [42, 42],
        msg: "panjang address wallet salah!",
      },
    },
  },
  imgString: {
    type: DataTypes.STRING(500000),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Tolong string base64 dari foto KTP nya!",
      },
    },
  },
},
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "foto_ktp",
    freezeTableName: true,
  });

module.exports = FotoKtp;
