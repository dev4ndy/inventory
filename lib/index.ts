import { App } from './app';

const PORT = process.env.PORT || 3000;
const app = new App().app;
// tslint:disable-next-line: no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
