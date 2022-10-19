const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("foto_ktp", {
      address_wallet: {
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
      img_string: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong string base64 dari foto KTP nya!",
          },
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("foto_ktp");
  },
};
