import { Uish } from 'pollenium-uvaursi';
import { Uint256 } from 'pollenium-buttercup';
export declare abstract class StateFetcher {
    abstract fetchFill(signedOrderHash: Uish): Promise<Uint256>;
    abstract fetchBalance(struct: {
        holder: Uish;
        token: Uish;
    }): Promise<Uint256>;
}
