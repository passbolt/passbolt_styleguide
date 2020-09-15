
/**
 * Mock the Comments Find request
 */
export default (eventSource, storage) => {
    return [{
        children: [],
        content: "tetete",
        created: "2020-09-01T13:13:19+00:00",
        created_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
        creator: {
            id: "5247399c-6c8a-47f0-8880-aa854e01e554",
            role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
            active: true,
            deleted: false,
            last_logged_in: "",
        },
        profile: {
            avatar: {url: {medium: "img/avatar/user_medium.png", small: "img/avatar/user.png"}},
            created: "2020-09-01T13:11:08+00:00",
            first_name: "Karl",
            id: "f6b23982-d3dd-4f8b-9bcc-f3a473edffc2",
            last_name: "Devooght",
            modified: "2020-09-01T13:11:08+00:00",
            user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
        },

        role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
        username: "karl@passbolt.com",
        foreign_key: "f302754f-f290-42a6-9ea3-7049c6d4dbe3",
        foreign_model: "Resource",
        id: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2",
        modified: "2020-09-01T13:13:19+00:00",
        modified_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
        parent_id: null,
        user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
    }];
}



