-- Deploy cosyworking:2.plpgsql_function to pg

BEGIN;

CREATE OR REPLACE FUNCTION public.get_user(
	parameters integer)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE result JSON;
DECLARE num INT;
BEGIN
	IF ((SELECT "user".role_id FROM "user" WHERE "user".id = (parameters)) = (SELECT role.id from role where role.description = 'host'))
	THEN
		SELECT row_to_json(row) FROM (
			SELECT "user".id, "user".avatar, "user".first_name, "user".username, "user".about, "user".created_at, role.description as role, (select json_agg(
																											json_build_object('workspace_id', workspace.id, 'workspace_title', workspace.title, 'image_link', image.link)
																									) as workspaces 
																												   FROM workspace 
																												   JOIN image ON image.workspace_id = workspace.id
																												   WHERE workspace.user_id = (parameters)AND image.main_image = true) 
			FROM "user"
			JOIN workspace ON workspace.user_id = "user".id
			JOIN image ON image.workspace_id = workspace.id
			JOIN role ON role.id = "user".role_id
			WHERE "user".id = (parameters) AND image.main_image = true) AS row INTO result;
	ELSE
		SELECT row_to_json(row) FROM (
			SELECT "user".id, "user".avatar, "user".first_name, "user".username, "user".about, "user".created_at
			FROM "user"
			WHERE "user".id = (parameters)) AS row INTO result;
	END IF;
	
	RETURN result;
END;
$BODY$;

COMMIT;
