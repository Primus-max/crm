import firebase from 'firebase/compat/app'

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/records`).push({record})
                // const category = await firebase.database().ref(`/users/${uid}/categories`).push({record})

            } catch (e) {
                throw e
            }
        }
    }
}


// firestore config

// rules_version = '2';
// service cloud.firestore {
//     match /databases/{database}/documents {
//     match /{document=**} {
//         allow read, write: if
//             request.time < timestamp.date(2022, 6, 1);
//     }
// }
// }
