import { Input } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card";
import WeatherCard from "../Card";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [weather, setWeather] = useState([]);
  const [isData, setData] = useState(false);

  const handleClick = () => {
    const err = axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=114e5c4f66f4ad750eec3e814c241e3d&units=imperials`
      )
      .then((res) => {
        setWeather(res.data);
        console.log(res.data);
        setData(true);
      })
      .catch((err) => {
        err;
        setData(false);
      });
  };

  return (
    <>
      <Container padding="10px" width="100vw">
        <Flex>
          <Input
            placeholder="Enter Your City"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={handleClick}
          />
        </Flex>
      </Container>
      {isData ? <WeatherCard value={weather} /> : <div> oops no value </div>}
    </>
  );
}

export default SearchBar;
