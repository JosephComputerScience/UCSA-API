// local imports
import app from './src/index';
import "dotenv/config"; 
// enums
import { MANDATORY_ENV_KEYS } from './src/enums';

const port = process.env.PORT || 3000; // 3000 is default port

// start server
app.listen(port, () => {
  // ensures server doesn't start without having the ENV variables needed to run
  for (const key of Object.values(MANDATORY_ENV_KEYS)) {
    if (!process.env[key]) {
      throw new Error(`Missing ENV variable ${key}`);
    }
  }
  console.log(`Server listening at http://localhost:${port}`);
});
