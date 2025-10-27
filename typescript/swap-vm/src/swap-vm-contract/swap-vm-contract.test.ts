import {describe, it, expect} from 'vitest'
import {Address, HexString} from '@1inch/sdk-shared'
import {QuoteArgs, QuoteNonViewArgs, SwapArgs} from './types'
import {SwapVMContract} from './swap-vm-contract'
import {SWAP_VM_CONTRACT_ADDRESSES} from './constants'
import {MakerTraits} from '../swap-vm/maker-traits'

describe('SwapVMContract', () => {
    const mockMaker = Address.fromBigInt(1n)
    const mockTokenIn = Address.fromBigInt(3n)
    const mockTokenOut = Address.fromBigInt(4n)
    const mockTraits = MakerTraits.default()
    const mockProgram = new HexString('0x01020304')
    const mockAmount = 1000n
    const mockTakerTraitsAndData = new HexString('0x05060708')
    const mockSigPlusTakerTraitsAndData = new HexString('0x090a0b0c')
    const mockContractAddress = SWAP_VM_CONTRACT_ADDRESSES[1]

    const mockOrder = {
        maker: mockMaker,
        traits: mockTraits,
        program: mockProgram
    }

    describe('encodeQuoteCallData', () => {
        it('should encode quote call data correctly', () => {
            const args: QuoteArgs = {
                order: mockOrder,
                tokenIn: mockTokenIn,
                tokenOut: mockTokenOut,
                amount: mockAmount,
                takerTraitsAndData: mockTakerTraitsAndData
            }

            const callData = SwapVMContract.encodeQuoteCallData(args)

            expect(callData).toBeInstanceOf(HexString)
        })
    })

    describe('encodeQuoteNonViewCallData', () => {
        it('should encode quoteNonView function call data correctly', () => {
            const args: QuoteNonViewArgs = {
                order: mockOrder,
                tokenIn: mockTokenIn,
                tokenOut: mockTokenOut,
                amount: mockAmount,
                takerTraitsAndData: mockTakerTraitsAndData
            }

            const result = SwapVMContract.encodeQuoteNonViewCallData(args)

            expect(result).toBeInstanceOf(HexString)
            expect(result.toString().startsWith('0x')).toBe(true)
        })
    })

    describe('encodeSwapCallData', () => {
        it('should encode swap function call data correctly', () => {
            const args: SwapArgs = {
                order: mockOrder,
                tokenIn: mockTokenIn,
                tokenOut: mockTokenOut,
                amount: mockAmount,
                sigPlusTakerTraitsAndData: mockSigPlusTakerTraitsAndData
            }

            const result = SwapVMContract.encodeSwapCallData(args)

            expect(result).toBeInstanceOf(HexString)
            expect(result.toString().startsWith('0x')).toBe(true)
        })
    })

    describe('buildQuoteTx', () => {
        it('should build quote transaction correctly', () => {
            const args: QuoteArgs = {
                order: mockOrder,
                tokenIn: mockTokenIn,
                tokenOut: mockTokenOut,
                amount: mockAmount,
                takerTraitsAndData: mockTakerTraitsAndData
            }

            const tx = SwapVMContract.buildQuoteTx(mockContractAddress, args)

            expect(tx).toBeDefined()
            expect(tx.to).toBe(mockContractAddress.toString())
            expect(tx.data.startsWith('0x')).toBe(true)
            expect(tx.value).toBe(0n)
        })
    })

    describe('buildQuoteNonViewTx', () => {
        it('should build quoteNonView transaction correctly', () => {
            const args: QuoteNonViewArgs = {
                order: mockOrder,
                tokenIn: mockTokenIn,
                tokenOut: mockTokenOut,
                amount: mockAmount,
                takerTraitsAndData: mockTakerTraitsAndData
            }

            const tx = SwapVMContract.buildQuoteNonViewTx(
                mockContractAddress,
                args
            )

            expect(tx).toBeDefined()
            expect(tx.to).toBe(mockContractAddress.toString())
            expect(tx.data.startsWith('0x')).toBe(true)
            expect(tx.value).toBe(0n)
        })
    })

    describe('buildSwapTx', () => {
        it('should build swap transaction correctly', () => {
            const args: SwapArgs = {
                order: mockOrder,
                tokenIn: mockTokenIn,
                tokenOut: mockTokenOut,
                amount: mockAmount,
                sigPlusTakerTraitsAndData: mockSigPlusTakerTraitsAndData
            }

            const tx = SwapVMContract.buildSwapTx(mockContractAddress, args)

            expect(tx).toBeDefined()
            expect(tx.to).toBe(mockContractAddress.toString())
            expect(tx.data.startsWith('0x')).toBe(true)
            expect(tx.value).toBe(0n)
        })
    })
})
