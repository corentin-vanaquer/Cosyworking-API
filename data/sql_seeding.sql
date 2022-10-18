BEGIN

INSERT INTO public.role(
	description)
	VALUES 
        ('coworker'),
        ('host'),
        ('admin');


INSERT INTO public."user"(
    last_name, first_name, email, password, username, avatar, about, gender, role_id)
    VALUES 
          ('Vanaquer', 'Corentin', 'vanaquer@cosyworking.fr', 'Password123$', 'Corentin.V', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/578.jpg', 'Je suis un super hôte', 'male', 2),
          ('Roggy', 'Quentin', 'roggy@cosyworking.fr', 'Password123$', 'Quentin.R', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/578.jpg', 'Je suis primé meilleur hôte de la Maine-et-Loire', 'male', 2),
          ('Kiwi', 'Jade', 'kiwi@cosyworking.fr', 'Password123$', 'Jade.K', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/851.jpg', 'Je suis fan du chocolat milka et de la moutarde de dijon', 'female', 2),
          ('Liorah', 'Ambre', 'liorah@cosyworking.fr', 'Password123$', 'Ambre.L', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1138.jpg', 'Je suis grande, riche et indépendante', 'female', 2),
          ('Gouttin', 'Paul', 'gouttin@cosyworking.fr', 'Password123$', 'Paul.G', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/40.jpg', 'Je suis célibataire, à la recherche de mon âme soeur', 'male', 2),
          ('Martin', 'Agath', 'martin@cosyworking.fr', 'Password123$', 'Agath.M', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1179.jpg', 'Je suis dev nomade et cherche un bureau', 'female', 1),
          ('Boutoile', 'Pierre', 'boutoile@cosyworking.fr', 'Password123$', 'Pierre.B', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/40.jpg', 'Bonjour, je suis gentil avec les chats et les plantes ', 'male', 1),
          ('Dubois', 'Alice', 'dubois@cosyworking.fr', 'Password123$', 'Alice.D', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1050.jpg', 'Salut je prendrais soins de votre bureau acceptez moi please', 'female', 1),
          ('Nougah', 'Benjamin', 'nougah@cosyworking.fr', 'Password123$', 'Benjamin.N', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/764.jpg', 'Hello je cherche des bureaux pour travailler sur un projet secret', 'male', 1),
          ('Brooks', 'Adelaide', 'brooks@cosyworking.fr', 'Password123$', 'Adelaide.B', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1050.jp', 'Hi, I am looking for a place to work with a big pool, work hard play hard!', 'female', 1);

INSERT INTO public.workspace(
	title, description, address, zip_code, city, longitude, latitude, half_day_price, day_price, availability, user_id)
	VALUES 
        ('Le Cocoon', 'Un bureau équipé pour votre bien être, décoré à travers la methode fengshui. Vous y serez épanouis et en sortirez plus heureux que jamais.', '30 rue Saint-Louis', '35000', 'Rennes', '-1.6840268', '48.1133316', 70, 140, true, 1),
        ('Happy Hour Loft', 'Mon loft est à votre service, vous pourrez y étancher votre soif et bien sûr y travailler comme il se doit', '8 rue Saint-Serge', '49100', 'Angers', '-0.55', '47.4667', 80, 160, true, 2),
        ('Bureau pas comme les autres', 'Bureau conceptuel dans une ambiance chat Sibérien. Pot de moutarde de Dijon offert', '5 rue Jacques Cellerier', '21000', 'Dijon', '5.0167', '47.3167', 40, 80, true, 3),
        ('Luxieuse Villa', 'Charmante Villa de 300m2, vous y trouverez une piscine à débordement sur le toit avec vu sur la Tour Effeil ', '3 Av. Anatole', '75007', 'Paris', '2.2966781', '48.8571483', 199, 399, true, 4),
        ('Charmant Atelier', 'Ancien atelier de poterie aménager en bureau, décoration inspiré du plus grand potier Bernard Palissy', '72 Pl. de Provence', '86000', 'Poitiers', '0.357187', '46.5894948', 30, 60, true, 5);


  INSERT INTO public.image(
    link, main_image, workspace_id)
    VALUES 
          -- first
          ('https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1103&q=80', true, 1),
          ('https://images.unsplash.com/photo-1618381801643-3d253a63a386?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', false, 1),
          ('https://images.unsplash.com/photo-1618381801643-3d253a63a386?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', false, 1),
          ('https://images.unsplash.com/photo-1618381801643-3d253a63a386?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', false, 1),
          ('https://images.unsplash.com/photo-1618381801643-3d253a63a386?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', false, 1),
          -- second
          ('https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80', true, 2),
          ('https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80', false, 2),
          ('https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80', false, 2),
          ('https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80', false, 2),
          ('https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80', false, 2),
          -- third
          ('https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80', true, 3),
          ('https://images.unsplash.com/photo-1556559322-b5071efadc88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', false, 3),
          ('https://images.unsplash.com/photo-1556559322-b5071efadc88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', false, 3),
          ('https://images.unsplash.com/photo-1556559322-b5071efadc88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', false, 3),
          ('https://images.unsplash.com/photo-1556559322-b5071efadc88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', false, 3),
          -- forth
          ('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', true, 4),
          ('https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', false, 4),
          ('https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', false, 4),
          ('https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', false, 4),
          ('https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', false, 4),
          -- fifth
          ('https://images.unsplash.com/photo-1601397210737-a5534480bdc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', true, 5),
          ('https://images.unsplash.com/photo-1567987768246-df799f9c8afb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80', false, 5),
          ('https://images.unsplash.com/photo-1567987768246-df799f9c8afb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80', false, 5),
          ('https://images.unsplash.com/photo-1567987768246-df799f9c8afb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80', false, 5),
          ('https://images.unsplash.com/photo-1567987768246-df799f9c8afb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80', false, 5);


INSERT INTO public.state(
	description)
	VALUES 
        ('En attente'),
        ('Validé'),
        ('Annulé'),
        ('Terminé'),
        ('Non disponible');

-- 5x booking_ref
INSERT INTO public.booking_ref
	DEFAULT VALUES;  

INSERT INTO public.booking_ref
	DEFAULT VALUES;  

INSERT INTO public.booking_ref
	DEFAULT VALUES;  

INSERT INTO public.booking_ref
	DEFAULT VALUES; 

INSERT INTO public.booking_ref
	DEFAULT VALUES;  


INSERT INTO public.equipment_has_workspace(
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
        (2, 5);


INSERT INTO public.booking(
        start_date, end_date, user_id, workspace_id, state_id, booking_ref_id)
        VALUES 
        -- first
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 6, 1, 2, 1),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 6, 1, 2, 1),
        -- second
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 7, 2, 2, 2),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 7, 2, 2, 2),
        -- thirdt
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 8, 3, 2, 3),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 8, 3, 2, 3),
        -- forth
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 9, 4, 2, 4),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 9, 4, 2, 4),
        -- fifth
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 10, 5, 2, 5),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 10, 5, 2, 5);


  INSERT INTO public.equipment(
    description, icon_link)
    VALUES 
    ('Imprimante', 'https://cdn-icons-png.flaticon.com/512/3022/3022251.png'),
    ('Fibre', 'https://cdn-icons-png.flaticon.com/512/6131/6131198.png'),
    ('Cuisine', 'https://cdn-icons-png.flaticon.com/512/481/481486.png'),
    ('Double écran', 'https://cdn-icons-png.flaticon.com/512/3018/3018288.png'),
    ('Enceinte', 'https://cdn-icons-png.flaticon.com/512/650/650504.png'),
    ('Piscine', 'https://cdn-icons-png.flaticon.com/512/2932/2932355.png');


COMMIT

