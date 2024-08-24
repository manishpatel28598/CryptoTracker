import axios from "axios";
import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import Search from '../components/Dashboard/Search'
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import TopButton from "../components/Common/BackToTop";
import Footer from "../components/Common/Footer";
import { get100Coins } from "../functions/get100Coins";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);

    // useEffect(()=>{
    //     axios
    //     .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&category=layer-1&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h&locale=en&precision=4")
    //     .then((response)=>{
    //         console.log("response>>", response);
    //     })
    //     .catch((error)=>{
    //         console.log("error>>", error);
    //     })
    // },[])

    const handlePageChange = (event, value) => {
        setPageNumber(value);
        var startingIndex = (value - 1) * 10;
        setPaginatedCoins(coins.slice(startingIndex, startingIndex + 10));
      };


    const onChange = (e) => {
        setSearch(e.target.value);
      };
    
      var filteredCoins = coins.filter((coin) => {
        if (
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
        ) {
          return coin;
        }
      });
    
      useEffect(() => {
        getData();
      }, []);

      const getData = async () => {
        setLoading(true);
        const data = await get100Coins();
        if (data) {
          setCoins(data);
          setPaginatedCoins(data.slice(0, 10));
          setLoading(false);
        }
      };
    

  return (
    <div>
      <TopButton />
      {loading ? (
        <Loader />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          <Header />
          <Search search={search} onChange={onChange} />
          <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
            setSearch={setSearch}
          />
          {!search && (
            <PaginationComponent
              pageNumber={pageNumber}
              handleChange={handlePageChange}
            />
          )}
        </div>
      )}
      <Footer/>
    </div>
  )
}

export default Dashboard
