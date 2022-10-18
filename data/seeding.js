require("dotenv").config();
const { faker } = require("@faker-js/faker");
const debug = require("debug")("seeding");
const bcrypt = require("bcryptjs");

const db = require("../app/config/db");

db.queryCount = 0;

faker.locale = "fr";
const NB_USERS = 10;
const NB_WORKSPACES = 5;

function pgQuoteEscape(row) {
  const newRow = {};
  Object.entries(row).forEach(([prop, value]) => {
      if (typeof value !== 'string') {
          newRow[prop] = value;
          return;
      }
      newRow[prop] = value.replaceAll("'", "''");
  });
  return newRow;
}

async function insertRoles() {


  const queryString = `
  INSERT INTO public.role(
    description)
    VALUES 
          ('coworker'),
          ('host'),
          ('admin')
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;
}


async function insertUsers(users) {
  await db.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');

  const password = bcrypt.hashSync('Password123$', 8);

  const queryString = `
  INSERT INTO public."user"(
    last_name, first_name, email, password, username, avatar, about, gender, role_id)
    VALUES 
          ('Vanaquer', 'Corentin', 'vanaquer@cosyworking.fr', '${password}', 'Corentin.V', 'images/avatar/578.jpeg', 'Je suis un super hôte', 'male', 2),
          ('Roggy', 'Quentin', 'roggy@cosyworking.fr', '${password}', 'Quentin.R', 'images/avatar/578.jpeg', 'Je suis primé meilleur hôte de la Maine-et-Loire', 'male', 2),
          ('Kiwi', 'Jade', 'kiwi@cosyworking.fr', '${password}', 'Jade.K', 'images/avatar/851.jpeg', 'Je suis fan du chocolat milka et de la moutarde de dijon', 'female', 2),
          ('Liorah', 'Ambre', 'liorah@cosyworking.fr', '${password}', 'Ambre.L', 'images/avatar/1138.jpeg', 'Je suis grande, riche et indépendante', 'female', 2),
          ('Gouttin', 'Paul', 'gouttin@cosyworking.fr', '${password}', 'Paul.G', 'images/avatar/40.jpeg', 'Je suis célibataire, à la recherche de mon âme soeur', 'male', 2),
          ('Martin', 'Agath', 'martin@cosyworking.fr', '${password}', 'Agath.M', 'images/avatar/1179.jpeg', 'Je suis dev nomade et cherche un bureau', 'female', 1),
          ('Boutoile', 'Pierre', 'boutoile@cosyworking.fr', '${password}', 'Pierre.B', 'images/avatar/40.jpeg', 'Bonjour, je suis gentil avec les chats et les plantes ', 'male', 1),
          ('Dubois', 'Alice', 'dubois@cosyworking.fr', '${password}', 'Alice.D', 'images/avatar/1050.jpeg', 'Salut je prendrais soins de votre bureau acceptez moi please', 'female', 1),
          ('Nougah', 'Benjamin', 'nougah@cosyworking.fr', '${password}', 'Benjamin.N', 'images/avatar/764.jpeg', 'Hello je cherche des bureaux pour travailler sur un projet secret', 'male', 1),
          ('Brooks', 'Adelaide', 'brooks@cosyworking.fr', '${password}', 'Adelaide.B', 'images/avatar/1050.jpeg', 'Hi, I am looking for a place to work with a big pool, work hard play hard!', 'female', 1)
  RETURNING id;
  `;

  const result = await db.query(queryString);
  return result.rows;
}

async function insertEquipment() {


  const queryString = `
  INSERT INTO public.equipment(
    description, icon_link)
    VALUES 
    ('Imprimante', 'images/equipment/3022251.png'),
    ('Fibre', 'images/equipment/6131198.png'),
    ('Cuisine', 'images/equipment/481486.png'),
    ('Double écran', 'images/equipment/3018288.png'),
    ('Enceinte', 'images/equipment/650504.png'),
    ('Piscine', 'images/equipment/2932355.png')
    RETURNING *;
    `;

  const result = await db.query(queryString);

  return result.rows;
}

async function insertStates() {


  const queryString = `
  INSERT INTO public.state(
    description)
    VALUES 
          ('En attente'),
          ('Validé'),
          ('Annulé'),
          ('Terminé'),
          ('Non disponible')
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;
}


async function insertWorkspaces(workspaces) {

  await db.query('TRUNCATE TABLE "workspace" RESTART IDENTITY CASCADE');


  const queryString = `
  INSERT INTO public.workspace(
    title, description, address, zip_code, city, longitude, latitude, half_day_price, day_price, availability, user_id)
    VALUES 
          ('Le Cocoon', 'Un bureau équipé pour votre bien être, décoré à travers la methode fengshui. Vous y serez épanouis et en sortirez plus heureux que jamais.', '30 rue Saint-Louis', '35000', 'rennes', '-1.6840268', '48.1133316', 70, 140, true, 1),
          ('Happy Hour Loft', 'Mon loft est à votre service, vous pourrez y étancher votre soif et bien sûr y travailler comme il se doit', '8 rue Saint-Serge', '49100', 'angers', '-0.55', '47.4667', 80, 160, true, 2),
          ('Bureau pas comme les autres', 'Bureau conceptuel dans une ambiance chat Sibérien. Pot de moutarde de Dijon offert', '5 rue Jacques Cellerier', '21000', 'dijon', '5.0167', '47.3167', 40, 80, true, 3),
          ('Luxueuse Villa', 'Charmante Villa de 300m2, vous y trouverez une piscine à débordement sur le toit avec vue sur la Tour Eiffel ', '3 Av. Anatole', '75007', 'paris', '2.2966781', '48.8571483', 199, 399, true, 4),
          ('Petite Villa', 'Petite Villa de 1300m2, parfait pour vos team building. ', '12 rue Desaix', '75015', 'paris', '2.294337574460753', '48.85408615197824', 80, 200, true, 1),
          ('Charmant Atelier', 'Ancien atelier de poterie aménager en bureau, décoration inspiré du plus grand potier Bernard Palissy', '72 Pl. de Provence', '86000', 'poitiers', '0.357187', '46.5894948', 30, 60, true, 5)
  RETURNING *;
`;

  const result = await db.query(queryString);

  return result.rows;
}

async function insertEquipmentForWorkspace() {

  const queryString = `
  INSERT INTO public.workspace_has_equipment(
    equipment_id, workspace_id)
    VALUES 
    (1, 1),
    (1, 2),
    (1, 3),
    (6, 4),
    (1, 5),
    (2, 1),
    (3, 2),
    (3, 3),
    (5, 4),
    (2, 5),
    (1, 6),
    (2, 6)
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;

}

async function insertBooking() {

  const queryString = `
  INSERT INTO public.booking(
    start_date, end_date, user_id, workspace_id, state_id, booking_ref_id, price)
    VALUES 
    -- first
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 6, 1, 1, 1, 140),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 6, 1, 1, 1, 70),
    -- second
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 7, 2, 2, 2, 160),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 7, 2, 2, 2, 80),
    -- thirdt
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 8, 3, 3, 3, 80),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 8, 3, 3, 3, 40),
    -- forth
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 9, 4, 2, 4, 399),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 9, 4, 2, 4, 199),
    -- fifth
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 10, 5, 1, 5, 200),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 10, 5, 1, 5, 80),
    ('2022-10-22T06:00:00Z', '2022-10-22T15:00:00Z', 10, 5, 1, 5, 200),
    ('2022-10-23T06:00:00Z', '2022-10-23T15:00:00Z', 10, 5, 1, 5, 200),
    -- sixth
    ('2022-10-28T06:00:00Z', '2022-10-28T15:00:00Z', 6, 3, 1, 6, 80),
    ('2022-10-29T11:00:00Z', '2022-10-29T15:00:00Z', 6, 3, 1, 6, 40)
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;
}

async function insertImage() {

  const queryString = `
  INSERT INTO public.image(
    link, main_image, workspace_id)
    VALUES 
          -- first
          ('images/workspace/photo-1416339442236-8ceb164046f8.avif', true, 1),
          ('images/workspace/photo-1618381801643-3d253a63a3861.avif', false, 1),
          ('images/workspace/photo-1618381801643-3d253a63a3862.avif', false, 1),
          ('images/workspace/photo-1618381801643-3d253a63a3863.avif', false, 1),
          ('images/workspace/photo-1618381801643-3d253a63a3864.avif', false, 1),
          -- second
          ('images/workspace/photo-1497366811353-6870744d04b2.avif', true, 2),
          ('images/workspace/photo-1535957998253-26ae1ef295061.avif', false, 2),
          ('images/workspace/photo-1535957998253-26ae1ef295062.avif', false, 2),
          ('images/workspace/photo-1535957998253-26ae1ef295063.avif', false, 2),
          ('images/workspace/photo-1535957998253-26ae1ef295064.avif', false, 2),
          -- third
          ('images/workspace/photo-1585779034823-7e9ac8faec70.avif', true, 3),
          ('images/workspace/photo-1556559322-b5071efadc881.avif', false, 3),
          ('images/workspace/photo-1556559322-b5071efadc882.avif', false, 3),
          ('images/workspace/photo-1556559322-b5071efadc883.avif', false, 3),
          ('images/workspace/photo-1556559322-b5071efadc884.avif', false, 3),
          -- forth
          ('images/workspace/photo-1600585154340-be6161a56a0c.avif', true, 4),
          ('images/workspace/photo-1497215842964-222b430dc0941.avif', false, 4),
          ('images/workspace/photo-1497215842964-222b430dc0942.avif', false, 4),
          ('images/workspace/photo-1497215842964-222b430dc0943.avif', false, 4),
          ('images/workspace/photo-1497215842964-222b430dc0944.avif', false, 4),
          -- fifth
          ('images/workspace/photo-1601397210737-a5534480bdc5.avif', true, 5),
          ('images/workspace/photo-1567987768246-df799f9c8afb1.avif', false, 5),
          ('images/workspace/photo-1567987768246-df799f9c8afb2.avif', false, 5),
          ('images/workspace/photo-1567987768246-df799f9c8afb3.avif', false, 5),
          ('images/workspace/photo-1567987768246-df799f9c8afb4.avif', false, 5)
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;

}

async function insertBookingRef() {

  const queryString = `
  INSERT INTO public.booking_ref (price) VALUES 
  (210),
  (240),   
  (120),   
  (598),   
  (680),
  (120);  
  `;

  // let data = [];

  // for(let i = 0; i < 6; i++){
  //   data.push(result);
  // }
  
  result = await db.query(queryString);
  return result;
}

(async () => {
  /**
  * Ajout des rôles en BDD
  */
  const insertedRoles = await insertRoles();
  debug(`${insertedRoles.length} roles inserted.`);

  /**
  * Ajout de ces utilisateurs en BDD
  */
  const insertedUsers = await insertUsers();
  debug(`${insertedUsers.length} users inserted.`);

  /**
   * Ajout des équipements en BDD
   */
  const insertedEquipments = await insertEquipment();
  debug(`${insertedEquipments.length} equipments inserted.`);

  /**
   * Ajout des states en BDD
   */
  const insertedStates = await insertStates();
  debug(`${insertedStates.length} states inserted.`);

  /**
  * Ajout de ces workspace en BDD
  */  
  const insertedWorkspace = await insertWorkspaces();
  debug(`${insertedWorkspace.length} workspaces inserted.`);

  /**
   * Affectation des Equipments à des workspaces
   */
   const insertedItems = await insertEquipmentForWorkspace();
   debug(`${insertedItems.length} workspaces has equipment inserted.`);

   /**
    * Création des bookingRef
    */
   const bookingRef = await insertBookingRef();
   debug(`${bookingRef.length} bookingRef inserted`);

   /**
    * Création de bookings en auto
    */
    const bookings = await insertBooking();
    debug(`${bookings.length} booking inserted.`);

    /**
     * Création des images de workspace
     */
    const images = await insertImage();
    debug(`${images.length} images inserted`);

})();
