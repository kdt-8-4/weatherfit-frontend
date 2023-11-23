import { atom } from "recoil"

interface SEARCH{
    categoryT:string;
    serch_data:string[];
}

export const FeedSearchData = atom<SEARCH[]>({
    key:'seach_key_dj',//전역적으로 유일한 값
    default:[
        {
            categoryT: "top",
            serch_data: []
        },
        {
            categoryT: "shoes",
            serch_data: []
        },
        {
            categoryT: "outer",
            serch_data: []
        },
        {
            categoryT: "pants",
            serch_data: []
        },
        {
            categoryT: "back",
            serch_data: []
        },
        {
            categoryT: "hat",
            serch_data: []
        },
        {
            categoryT: "hash_tag",
            serch_data: []
        },
    ]
});