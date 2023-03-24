-- OWNER
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('bb20312a-f423-4497-92ea-2b8a25a702bd', (SELECT id FROM roles WHERE name = 'ROLE_OWNER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('bb20312a-f423-4497-92ea-2b8a25a702bd', (SELECT id FROM roles WHERE name = 'ROLE_SUPER_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('bb20312a-f423-4497-92ea-2b8a25a702bd', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('bb20312a-f423-4497-92ea-2b8a25a702bd', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

-- SUPER_ADMINS
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f6996e9b-5d67-4acd-9aad-ebf345884068', (SELECT id FROM roles WHERE name = 'ROLE_SUPER_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f6996e9b-5d67-4acd-9aad-ebf345884068', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f6996e9b-5d67-4acd-9aad-ebf345884068', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

INSERT INTO public.users_roles (user_id, role_id)
VALUES ('4d9f478a-0dae-44f8-b462-bd8bc6afd580', (SELECT id FROM roles WHERE name = 'ROLE_SUPER_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('4d9f478a-0dae-44f8-b462-bd8bc6afd580', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('4d9f478a-0dae-44f8-b462-bd8bc6afd580', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

INSERT INTO public.users_roles (user_id, role_id)
VALUES ('0b5df75d-111a-4455-b2cc-1e21034b0c46', (SELECT id FROM roles WHERE name = 'ROLE_SUPER_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('0b5df75d-111a-4455-b2cc-1e21034b0c46', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('0b5df75d-111a-4455-b2cc-1e21034b0c46', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

INSERT INTO public.users_roles (user_id, role_id)
VALUES ('90c63ffb-2f9c-40f4-a208-6a9b1de939f2', (SELECT id FROM roles WHERE name = 'ROLE_SUPER_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('90c63ffb-2f9c-40f4-a208-6a9b1de939f2', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('90c63ffb-2f9c-40f4-a208-6a9b1de939f2', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

INSERT INTO public.users_roles (user_id, role_id)
VALUES ('91c54ffb-3f8d-12f3-a234-6f3a2ff33711', (SELECT id FROM roles WHERE name = 'ROLE_SUPER_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('91c54ffb-3f8d-12f3-a234-6f3a2ff33711', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('91c54ffb-3f8d-12f3-a234-6f3a2ff33711', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

-- ADMINS
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('fb32b44a-9172-4616-aedf-a4c657e7cf15', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('fb32b44a-9172-4616-aedf-a4c657e7cf15', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

INSERT INTO public.users_roles (user_id, role_id)
VALUES ('641d1f6a-ddc2-43bf-95b0-ebd09ae22be5', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('641d1f6a-ddc2-43bf-95b0-ebd09ae22be5', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

INSERT INTO public.users_roles (user_id, role_id)
VALUES ('3dd9b32c-b2ae-41e4-807f-f2e36243648d', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('3dd9b32c-b2ae-41e4-807f-f2e36243648d', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

INSERT INTO public.users_roles (user_id, role_id)
VALUES ('42afa94b-8a2b-47f4-8244-4852f140c820', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('42afa94b-8a2b-47f4-8244-4852f140c820', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

INSERT INTO public.users_roles (user_id, role_id)
VALUES ('d4574160-7e61-4838-a8ba-2dfcc31d0fce', (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('d4574160-7e61-4838-a8ba-2dfcc31d0fce', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

-- CUSTOMERS
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('016f0990-ecfe-48a9-aba9-86b4e5488450', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('0d3bae50-38ca-46f6-bc85-12338d003d8a', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('1910e67b-d535-479b-81a9-b41028e4bdb6', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('3ee10e7d-6fef-4b39-89a2-b1f1137a0874', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('ced2a9b8-6e52-4e53-83fa-b13010b61e2f', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

INSERT INTO public.users_roles (user_id, role_id)
VALUES ('fdf66e31-d7fa-4c7b-816e-0a0e67f4e0f8', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f5f3e55c-521f-40f1-ac69-5738e05edecc', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('a9451b6e-fbc0-4f44-9ce3-206965a42bf5', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('1fc65b03-dcb9-4789-8d81-c4e9ebce7f42', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('6f4f49e9-ff69-4f9c-b79d-f06bcde0ae70', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('a02e770b-8c45-42ae-a645-6cb529ab03bc', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('4033891e-7513-4e53-80dc-fbaf4e7ac743', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f292eeca-49ad-4d85-9e65-ffcca657e9e9', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('b949467e-f898-4433-a9e0-1bf0760b31f4', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('5f77f28a-c51f-4dd8-8394-07b772621900', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('d30b8cff-499e-404c-bd2a-8c2b77922ec2', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('0f80dfb7-a98f-452c-a08b-10d18eee7386', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('85b1486f-8b29-4b6e-99d0-dee76a560890', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('31de73f5-ab16-4daf-a8a6-c115213be370', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f0478953-c702-452b-9462-8e71b45791d6', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('21dc0b9c-da88-4ee4-8a21-4182ecc9f6ca', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('a2cb4336-b02a-469d-993c-8ff7d94fddbf', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('ab36c97c-2495-4e79-ac31-08c5f8f79f74', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f7840345-eb13-49e5-8921-396320a8143e', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('9d7a3401-9548-41da-8340-fc186243311f', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('c65241d1-cf1e-4d84-8b54-e94eddfe6a56', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('3dd52d8e-6aaf-467d-bbc7-9a0376defd3e', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('acb823c1-416e-4f36-a7ba-ea6cfd68608f', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('bfa82bd2-329e-4aef-8ced-b4090c5b868b', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('ba493232-1613-454a-9809-be60fa576df8', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('c51da268-8c31-4ce6-bd08-0967b13dcff1', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('ced71e13-8455-4f4e-8b87-7bd1a6e775ce', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('bf7d7f5a-38ab-4790-8ef0-a3026a0d981f', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('873c0c2d-82f3-4a31-a842-46f227462602', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f9c3a980-78b9-4d23-b60f-5db005fd46d6', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('ca8fb72e-e21a-46cd-972f-41090ff0d5fb', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('bcadf60f-c377-406a-bff1-9082f9e058c4', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('5ec5f9d3-a2dc-4910-9c37-54a6f68ec0bc', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('3421ab78-a1fc-4afb-9ccc-90027a7b9d6a', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('ee98dc11-5b58-431b-91a2-a5f37e71ec96', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('68456b67-7500-4e22-bb0a-6cdb332d6259', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f694d9ed-b0bf-4ac0-a5c3-9a7e969bb895', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('345e5d27-aaca-4460-a007-c58b9d6392f4', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('737e359f-f036-4606-945d-20c6084044d4', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('d13b546e-4de1-486c-9347-18918cdb62df', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f5c418ac-86dd-492f-829a-172948a0eebe', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('144f2798-2030-4120-8b7a-31e6927ce7c5', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('c3dceb95-9cd6-4466-836f-7ec8177026b3', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('c988901a-e883-4455-bb2a-683b5953091f', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('e4934386-2e71-4863-8d5f-f96b9dcd1d0d', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('e2b0cea9-1756-4856-970f-744727c8d870', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('bdca5ac3-6f68-4d63-b8c3-02802db10ecf', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('cd0ec072-3f34-4446-a40b-b1131d52db74', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('fe306630-f28e-44c7-a586-58b83e8ff92e', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('94b17b22-3b81-41ff-892a-00a3b1daef8d', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('39b4a486-3962-4940-9c43-4c4f69222905', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('3f232efe-b1eb-49b4-bc90-a711363236dd', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('ce49643c-bdfc-4e32-9494-586975450b9c', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('b3c47dad-f752-4a1b-af87-59ab0451db7c', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('53d803ff-fe64-463c-9c77-40c8e8e93246', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('04f03eef-0c22-4417-b7b9-89df03f16b4e', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('13d02bca-09b7-46b6-aeaf-df3b627c7a61', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('ce298028-0989-4a38-9b54-c147c84d28fe', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('851d4a63-e5da-4129-bae3-34e123b09a23', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('85b58c89-1bfd-4811-8999-1a0bd54dcdf7', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('79613024-3e5a-402a-9135-1bd04050e50c', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('c42806c4-8328-460a-809e-deec9bb2caaf', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('711c70e6-8e66-4d87-8eb9-607657a8dad3', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('9fd5da9d-9a11-45c3-b3a9-9b545e019f99', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('1d3975aa-dfca-49c7-a5a1-654b93ecc3a6', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('8eb6c8ed-fe22-4dc6-855c-4091516cdc28', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('55d555aa-87d9-4d45-95c1-2b0c13c58fdd', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('c2a0d4c7-61b7-4a4c-a4e3-390487f5b2c5', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('92b572da-950d-4a91-93b1-0a3b4e85e4ee', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('d622ee2d-7473-4e6a-ae48-044341fbdf6a', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('a401bdee-3628-430d-90a4-60f456ed7c52', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('0f594818-f38a-4080-8bc0-9a2534a41363', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('053713dd-c497-4a61-8a6e-d8faff1da9b8', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('de5b38b5-30d1-4f5d-b65d-49e7fdf93493', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('6b84da2b-6449-4a23-9a47-9183c7df62c9', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('264ed29d-a7d2-4f3f-9823-48be0b9d8746', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('8b62c874-fac7-4b63-9677-d6b33f391bb7', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('fc4681ca-ad27-4cd8-acbc-561f4a4a8fdd', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('04b2eddd-abe1-4547-9b64-b6b9d9cb6515', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('60f4f23f-5755-440d-931f-75ea0c4af697', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f2497240-ce6f-4bf8-9503-d724ec72f4cd', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('4fcc0a79-89d4-49aa-8dc6-0a115ebf73c5', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('5757ce22-60dc-4d8a-bf84-9a46ee75f09a', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('e0e27fe0-2777-401a-a922-589e73d5b4a9', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('2de291df-cfb5-45a8-9a47-58e0bdb35299', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('63e8e0f4-4fc2-4499-b9c0-0312d7e683e1', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('0886727f-8443-4255-b6d0-4681336b588d', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('b13d5430-49e0-458a-8467-0c170a809bd6', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('d982884a-d634-4bbb-a92b-cdbaba1f8214', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('44ea5863-1e94-45a7-8386-a4fc03ab920f', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('5416c249-fbf4-437f-858f-7a66f270a66d', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('0e91b9b9-4266-4127-820e-b48f515e3b2b', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('7d1b5088-3003-42ce-a618-da592efbb010', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f943a271-ae99-4e5e-ab4e-87266360f191', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('d70890d6-884a-4ce7-afde-9f5e6c54ca57', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('f5edb249-6f2a-4415-94e3-4d784f2aa210', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));
INSERT INTO public.users_roles (user_id, role_id)
VALUES ('70c319db-6496-4841-a795-b69bdf20b86a', (SELECT id FROM roles WHERE name = 'ROLE_CUSTOMER'));

