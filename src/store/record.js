import firebase from 'firebase/compat/app'

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch (e) {
                throw e
            }
        },
        async fetchRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
                return Object.keys(records).map(key => ({...records[key], id: key}))
            }catch (e) {
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
