-- Revert cosyworking:2.plpgsql_function from pg

BEGIN;

DROP FUNCTION get_user;
COMMIT;
