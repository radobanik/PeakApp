import initGrades from "./grade.init";
import initRoutes from "./route.init";
import initUsers from "./user.init";

/**
 * must be in the right order!
 */
const initFunctions = [
    initUsers,
    initGrades,
    initRoutes,
];

async function initAll() {
  console.log("Initializing all");
  for (const initFunction of initFunctions) {
    console.log(`Initializing ${initFunction.name}`);
    await initFunction();
  }
  console.log("All initialized");
}

initAll();

export default initAll;
