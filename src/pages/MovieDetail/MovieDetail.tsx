import {
  Box,
  Grid,
  Image,
  Text,
  Divider,
  Badge,
  VStack,
  HStack,
  GridItem,
  AspectRatio,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieMagementService from "@/services/MovieManagementService";

const MovieDetails = () => {

  const location = useLocation();
  const movieId = location.state;
  const movieManagementService = new MovieMagementService();
  const [movieDetails, setMovieDetails] = useState({}) as any;

  const fetchMovieDetails = async () => {
    const body: any = await movieManagementService.fetchMovieByID(movieId);
      if(body == null){
        alert("Something went wrong while loading movie details. Please try again.")
      }
      else{
        const released_date = new Date(body.released_date);
        const yyyy = released_date.getFullYear();
        let mm:any = released_date.getMonth() + 1; 
        let dd:any = released_date.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedReleasedDate = mm + '/' + dd + '/' + yyyy;
        body.released_date = formattedReleasedDate;
        setMovieDetails(body);
      }
  };

  useEffect(() => {
    fetchMovieDetails();
  },[])

  return (
    <Box maxW="1200px" mx="auto" my="6">
      <Grid 
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} // set 1 column on small screens, 2 columns on medium screens, 3 columns on large screens, and 4 columns on extra-large screens
        gap="6">
        <Box
        ml={2}
        mr={2}>
          <Image 
            src={movieDetails.poster} 
            alt={movieDetails.title} 
            w={["350px", "500px", "700px", "700px"]}
            h={["350px", "500px", "600px", "600px"]}
          />
        </Box>
        <Box 
            ml={2}
            mr={2}
            w={["350px", "450px", "700px", "700px"]}
            h={["auto", "auto", "auto", "auto"]}
        >
          <Text fontWeight="bold" fontSize="4xl" mt="4">
            {movieDetails.title}
          </Text>
          <Text fontSize="xl" fontWeight="semibold" color="gray.500">
            {movieDetails.released_date} | {movieDetails.time_in_minutes} Minutes |{" "}
            {movieDetails.genres?.map((genre: any, index: any) => (
              <Badge key={index} mr="1" colorScheme="purple">
                {genre}
              </Badge>
            ))}
          </Text>
          <Box mt="4" mb="4">
            <Text>{movieDetails.plot}</Text>
          </Box>
          <Divider my="1" />
          <VStack alignItems="flex-start" mb={4}>
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Cast
            </Text>
            {movieDetails.cast?.map((actor: any, index: any) => (
              <HStack key={index}>
                <Text fontWeight="semibold">{actor}</Text>
              </HStack>
            ))}
          </VStack>
          <Divider my="2" />
          <VStack alignItems="flex-start" mb={4}>
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Director
            </Text>
            <Text fontWeight="semibold">{movieDetails.director}</Text>
          </VStack>
          <Divider my="2" />
          <VStack alignItems="flex-start" mb={4}>
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Trailer
            </Text>
            <AspectRatio ratio={16 / 9} w="100%">
                <iframe 
                    width="500" 
                    height="315" 
                    src={movieDetails.trailor}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                >
                </iframe>
            </AspectRatio>
          </VStack>
        </Box>
      </Grid>
      <Divider my="6" />

      <Box
        ml={2}
        mr={2}>
        <Text fontWeight="bold" fontSize="2xl" mb="4">
          Related Images
        </Text>
        <SimpleGrid p={4} columns={{ base: 1, md: 4, lg: 8 }} gap={4}>
            {movieDetails.images?.map((image: any, index: any) => (
                <GridItem colSpan={2}>
                    <Image height="300px" width="400px" src={image} borderRadius="sm" boxShadow="md" />
                </GridItem>
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default MovieDetails;