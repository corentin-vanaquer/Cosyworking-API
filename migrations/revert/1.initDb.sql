-- Revert cosyworking:1.initDb from pg

BEGIN;

DROP TABLE IF EXISTS public.workspace_has_equipment, public.booking, public.booking_ref, public.image, public.workspace, public.state, public.equipment, public.user, public.role;

DROP DOMAIN IF EXISTS public.email;

DROP DOMAIN IF EXISTS public.zip_code_fr;

COMMIT;
