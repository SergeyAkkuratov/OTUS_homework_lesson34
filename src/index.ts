import "./style.css";
import { getMessagesFromFirebase } from "./FirebaseApi";


async function test() {
    const result = await getMessagesFromFirebase();
    console.log(result);
}

test();