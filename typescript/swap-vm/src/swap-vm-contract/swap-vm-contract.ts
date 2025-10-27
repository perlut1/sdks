import {encodeFunctionData} from 'viem'
import {CallInfo, Address, HexString} from '@1inch/sdk-shared'
import {QuoteArgs, QuoteNonViewArgs, SwapArgs} from './types'
import SWAP_VM_ABI from '../abi/SwapVM.abi.json' with {type: 'json'}

/**
 * SwapVM contract encoding/decoding utilities
 */
export class SwapVMContract {
    /**
     * Encode quote function call data
     * @see https://github.com/1inch/swap-vm/blob/main/src/SwapVM.sol#L84
     */
    static encodeQuoteCallData(args: QuoteArgs): HexString {
        const result = encodeFunctionData({
            abi: SWAP_VM_ABI,
            functionName: 'quote',
            args: [
                {
                    maker: args.order.maker.toString(),
                    traits: args.order.traits.asBigInt(),
                    program: args.order.program.toString()
                },
                args.tokenIn.toString(),
                args.tokenOut.toString(),
                args.amount,
                args.takerTraitsAndData.toString()
            ]
        })

        return new HexString(result)
    }

    /**
     * Encode quoteNonView function call data
     * @see https://github.com/1inch/swap-vm/blob/main/src/SwapVM.sol#L109
     */
    static encodeQuoteNonViewCallData(args: QuoteNonViewArgs): HexString {
        const result = encodeFunctionData({
            abi: SWAP_VM_ABI,
            functionName: 'quoteNonView',
            args: [
                {
                    maker: args.order.maker.toString(),
                    traits: args.order.traits.asBigInt(),
                    program: args.order.program.toString()
                },
                args.tokenIn.toString(),
                args.tokenOut.toString(),
                args.amount,
                args.takerTraitsAndData.toString()
            ]
        })

        return new HexString(result)
    }

    /**
     * Encode swap function call data
     * @see https://github.com/1inch/swap-vm/blob/main/src/SwapVM.sol#L124
     */
    static encodeSwapCallData(args: SwapArgs): HexString {
        const result = encodeFunctionData({
            abi: SWAP_VM_ABI,
            functionName: 'swap',
            args: [
                {
                    maker: args.order.maker.toString(),
                    traits: args.order.traits.asBigInt(),
                    program: args.order.program.toString()
                },
                args.tokenIn.toString(),
                args.tokenOut.toString(),
                args.amount,
                args.sigPlusTakerTraitsAndData.toString()
            ]
        })

        return new HexString(result)
    }

    /**
     * Build quote transaction
     */
    static buildQuoteTx(contractAddress: Address, args: QuoteArgs): CallInfo {
        return {
            to: contractAddress.toString(),
            data: this.encodeQuoteCallData(args).toString(),
            value: 0n
        }
    }

    /**
     * Build quoteNonView transaction
     */
    static buildQuoteNonViewTx(
        contractAddress: Address,
        args: QuoteNonViewArgs
    ): CallInfo {
        return {
            to: contractAddress.toString(),
            data: this.encodeQuoteNonViewCallData(args).toString(),
            value: 0n
        }
    }

    /**
     * Build swap transaction
     */
    static buildSwapTx(contractAddress: Address, args: SwapArgs): CallInfo {
        return {
            to: contractAddress.toString(),
            data: this.encodeSwapCallData(args).toString(),
            value: 0n
        }
    }
}
