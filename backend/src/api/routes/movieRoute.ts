import { Router } from "express";
import movieController from "../controllers/MovieController";

const movieRoute = (): Router => {
  const router = Router();

  router.route("/add-movie/").post(movieController.createMovie);
  router.route("/fetch-latest-movies/").get(movieController.fetchLastestMovies);

//   router
//     .route("/:movieId")
//     .get(movieController.getmovie)
//     .put(movieController.updatemovie)
//     .delete(movieController.deletemovie);

  return router;
};

export default movieRoute;