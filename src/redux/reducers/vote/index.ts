import initState from "../initState";
import { createAppSlice } from "../slice";

export const saveVoteSlice = createAppSlice("vote", initState.payload.vote);

export default saveVoteSlice.reducer;
