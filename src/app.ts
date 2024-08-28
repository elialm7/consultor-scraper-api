
import path from 'path';
import express from 'express';
import { router } from '../src/api/routes/consultor.router';
import expressLayouts from 'express-ejs-layouts';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', false);
app.use(router);

app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
});
