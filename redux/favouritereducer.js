const initialvalue = {
    favouriteListIds:[]
}

export default (state = initialvalue, action) => {
    switch(action.type){
        case 'Add-fav': 
        const indexadd = state.favouriteListIds.findIndex(({ id }) => id == action.payload.id);
        if(indexadd<0){
        return {
            ...state,
            favouriteListIds: [...state.favouriteListIds,action.payload]
        }}
        else{
            return{
                ...state,
                favouriteListIds: state.favouriteListIds
            }
        }
        case 'Remove-fav':
            const indexn = state.favouriteListIds.findIndex(({ id }) => id == action.payload.id);
            if(!(indexn<0)){state.favouriteListIds.splice(indexn,1);}
            return{
                ...state,
                favouriteListIds: [...state.favouriteListIds]
            }
            default:
                return state;
    }
}