import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, get, remove } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

provider.setCustomParameters({
    prompt: 'select_account',
});

// 명령형 함수 (로그인해! 로그아웃해!)
export function login() {
    signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
    signOut(auth);
}

// 결과에 관심있는 컴포넌트가 있을 때 사용
export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        // 1. 사용자가 있는 경우 (로그인한 경우)
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}

async function adminUser(user) {
    return get(ref(database, 'admins')) //
        .then((snapshot) => {
            if (snapshot.exists()) {
                const admins = snapshot.val();
                const isAdmin = admins.includes(user.uid);
                return { ...user, isAdmin };
            }
            return user;
        });
}

export async function addNewProduct(product, image) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        options: product.options.split(','),
    });
}

export async function getProducts() {
    return get(ref(database, 'products')) //
        .then((snapshot) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            }
            return [];
        });
}

export async function getCart(userId) {
    return get(ref(database, `carts/${userId}`)) //
        .then((snapshot) => {
            const items = snapshot.val() || {};
            return Object.values(items);
        });
}

export async function addOrUpdateToCart(userId, product) {
    return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
    return remove(ref(database, `carts/${userId}/${productId}`));
}
