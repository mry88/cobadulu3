import { useState } from "react";
import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUsers, FaChevronDown, FaChevronRight, FaClipboard, FaTachometerAlt, FaBook, FaBarcode, FaBoxOpen } from "react-icons/fa";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  const [showCategorySubgroup, setShowCategorySubgroup] = useState(false);
  const [showProductsSubgroup, setShowProductsSubgroup] = useState(false);
  const [showFeaturesSubgroup, setShowFeaturesSubgroup] = useState(false);

  const toggleCategorySubgroup = () => {
    setShowCategorySubgroup(!showCategorySubgroup);
    setShowProductsSubgroup(false);
    setShowFeaturesSubgroup(false);
  };

  const toggleProductsSubgroup = () => {
    setShowProductsSubgroup(!showProductsSubgroup);
    setShowCategorySubgroup(false);
    setShowFeaturesSubgroup(false);
  };

  const toggleFeaturesSubgroup = () => {
    setShowFeaturesSubgroup(!showFeaturesSubgroup);
    setShowProductsSubgroup(false);
    setShowCategorySubgroup(false);
  };

  if (!auth.isAdmin) return <div className="flex justify-center items-center font-medium text-6xl 
  min-h-screen pt-32 text-white bg-gray-800">Akses ditolak. Bukan Admin!</div>;

  return (
    
    <div className="flex h-auto bg-gray-900">
      <div className="w-64 h-auto bg-neutral-900 py-24">
        <nav className="space-y-2">
          <NavLink
            to="/admin/summary"
            className="block p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 rounded-lg"
            activeClassName="bg-gray-700"
          >
            <FaTachometerAlt className="inline-block mr-2" />
            Ringkasan
          </NavLink>
          <div>
            <div
              onClick={toggleProductsSubgroup}
              className="cursor-pointer p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 flex items-center justify-between rounded-lg"
            >
              <div>
                <FaClipboard className="inline-block mr-2" />
                Produk
              </div>
              {showProductsSubgroup ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </div>
            {showProductsSubgroup && (
              <div className="pl-3">
                <NavLink
                  to="/admin/products"
                  className="block p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 rounded-lg"
                  activeClassName="bg-gray-700"
                >
                  List Produk
                </NavLink>
                <NavLink
                  to="/admin/products/create-product"
                  className="block p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 rounded-lg"
                  activeClassName="bg-gray-700"
                >
                  Tambah Produk
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/admin/orders"
            className="block p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 rounded-lg"
            activeClassName="bg-gray-700"
          >
            <FaClipboard className="inline-block mr-2" />
            Pesanan
          </NavLink>
          <div>
            <div
              onClick={toggleCategorySubgroup}
              className="cursor-pointer p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 flex items-center justify-between rounded-lg"
            >
              <div>
                <FaBook className="inline-block mr-2" />
                Kategori
              </div>
              {showCategorySubgroup ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </div>
            {showCategorySubgroup && (
              <div className="pl-3">
                <NavLink
                  to="/admin/category"
                  className="block p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 rounded-lg"
                  activeClassName="bg-gray-700"
                >
                  List Kategori
                </NavLink>
                <NavLink
                  to="/admin/category/create-category"
                  className="block p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 rounded-lg"
                  activeClassName="bg-gray-700"
                >
                  Tambah Kategori
                </NavLink>
              </div>
            )}
          </div>
          <NavLink
            to="/admin/users"
            className="block p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 rounded-lg"
            activeClassName="bg-gray-700"
          >
            <FaUsers className="inline-block mr-2" />
            Pengguna
          </NavLink>
          <div>
            <div
              onClick={toggleFeaturesSubgroup}
              className="cursor-pointer p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 flex items-center justify-between rounded-lg"
            >
              <div>
                <FaBoxOpen className="inline-block mr-2" />
                Fitur
              </div>
              {showFeaturesSubgroup ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </div>
            {showFeaturesSubgroup && (
              <div className="pl-3">
                <NavLink
                  to="/admin/features"
                  className="block p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 rounded-lg"
                  activeClassName="bg-gray-700"
                >
                  List Fitur
                </NavLink>
                <NavLink
                  to="/admin/features/create-features"
                  className="block p-3 text-white text-base font-medium mx-3 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-gray-700 rounded-lg"
                  activeClassName="bg-gray-700"
                >
                  Tambah Fitur
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="flex min-h-screen flex-col flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;

