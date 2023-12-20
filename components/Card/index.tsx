import {
  Flex,
  Text,
  Image,
  Box,
  SimpleGrid,
  ListItem,
  UnorderedList,
  Card,
} from "@chakra-ui/react";

const WeatherCard = (props: any) => {
  const data = props.value; //stores props values in data
  const weatherItems = data?.weather; //gets the values of weather
  const cityName = data?.name;
  const cityMain = data?.main;
  const weatherForecast = data?.main?.feels_like;
  const weatherIcon = Object.values(weatherItems || {})
    .map((itm: any) => itm.icon)
    .join("");
  const url = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  //date and time
  const dT = data?.dt;
  const time = data?.timezone;
  const cityMonth = new Date(dT * 1000 + time * 1000).getMonth();
  const cityTime = new Date(dT * 1000 + time * 1000).getDay();
  const minutes = new Date(dT * 1000 + time * 1000).getMinutes();
  const hours = new Date(dT * 1000 + time * 1000).getHours();
  const cityDate = new Date(dT * 1000 + time * 1000).getDate();
  const cityMinutes = minutes < 10 ? `0` + minutes : minutes;
  const cityHours = hours < 10 ? `0` + hours : hours;
  const mainTime = `${hours}:${minutes}`;
  let val;
  const dayArray = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const day = dayArray[cityTime];
  const monthArray = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  const month = monthArray[cityMonth];
  let tempName: any = [];
  let tempValue: any = [];

  const fullDate = `${day} ${cityDate} ${month}`;
  const unicode = "\u00b0";

  //actual data array
  let weatherArray = [fullDate, cityName, mainTime];
  //weather key names
  Object.keys(cityMain)
    .filter((val, index) => index != 1)
    .map((key) => {
      tempName.push(key);
    });
  //weather value numbers
  Object.values(cityMain)
    .filter((val, index) => index != 1)
    .map((val) => {
      tempValue.push(val);
    });

  //main weather key name and value to display
  let mainTemp = tempName.map((val: any, index: any) => {
    return `${val} : ${tempValue[index]}`;
  });

  return (
    <SimpleGrid
      columns={2}
      minChildWidth="500px"
      placeItems="center"
      spacing={16}
    >
      <Box
        m="10px"
        h="500px"
        w="400px"
        mt="40px"
        bgImage="url(./img/pexels-pixabay-158163.jpg)"
        bgPosition="bottom"
        borderRadius="2xl"
        shadow="dark-lg"
      >
        {weatherArray.map((element, index) => (
          <UnorderedList>
            <ListItem
              color="white"
              display="flex"
              justifyContent="center"
              mt="20px"
              key={index}
            >
              {element}
            </ListItem>
          </UnorderedList>
        ))}
        <Image
          src={url}
          alt="weather-icon"
          width={100}
          height={100}
          ml="155"
          p="0"
        />
        <Text
          color="white"
          display="flex"
          justifyContent="center"
          mt="5px"
          fontSize="20px"
        >
          {weatherForecast}
          {unicode}
        </Text>
        <Text color="white" display="flex" justifyContent="center" mt="200px">
          {" "}
          Current Weather{" "}
        </Text>
      </Box>

      <Box
        m="10px"
        h="500px"
        w="400px"
        mt="40px"
        bgImage="url(./img/pexels-pixabay-158163.jpg)"
        bgPosition="center"
        borderRadius="2xl"
        shadow="dark-lg"
      >
        <Flex wrap="wrap" gap="2" justifyContent="space-around">
          {mainTemp.map((val: any, index: any) => (
            <Box
              color="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              p="5"
              w="150px"
              key={index}
            >
              {" "}
              {val}{" "}
            </Box>
          ))}
        </Flex>
      </Box>
    </SimpleGrid>
  );
};

export default WeatherCard;
