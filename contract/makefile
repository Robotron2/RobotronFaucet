#######################################
#        FOUNDry PRO MAKEFILE        #
#######################################

.DEFAULT_GOAL := help

#######################################
#            CONFIGURATION            #
#######################################

include .env

NETWORK ?= anvil
SCRIPT ?= script/RBNT.s.sol:RBNTScript

ANVIL_RPC_URL = http://127.0.0.1:8545
# SEPOLIA_RPC_URL = $(SEPOLIA_RPC_URL)
# MAINNET_RPC_URL = $(MAINNET_RPC_URL)

#######################################
#              HELP MENU              #
#######################################

help:
	@echo ""
	@echo "========== Foundry Makefile =========="
	@echo ""
	@echo "make build              - Compile contracts"
	@echo "make test               - Run tests"
	@echo "make test-verbose       - Run tests with -vvvv"
	@echo "make coverage           - Run coverage"
	@echo "make gas                - Generate gas snapshot"
	@echo "make clean              - Clean build artifacts"
	@echo "make format             - Format contracts"
	@echo ""
	@echo "make anvil              - Start local node"
	@echo ""
	@echo "make deploy NETWORK=anvil"
	@echo "make deploy NETWORK=sepolia"
	@echo "make deploy NETWORK=lisk"
	@echo "make deploy NETWORK=mainnet"
	@echo ""
	@echo "make verify NETWORK=sepolia ADDRESS=0x..."
	@echo ""
	@echo "======================================="
	@echo ""

#######################################
#         BASIC DEVELOPMENT           #
#######################################

.PHONY: build test test-verbose coverage gas clean format

build:
	forge build

test:
	forge test

test-verbose:
	forge test -vvvv

coverage:
	forge coverage

gas:
	forge snapshot

format:
	forge fmt

clean:
	forge clean

#######################################
#         LOCAL DEVELOPMENT           #
#######################################

anvil:
	anvil

#######################################
#         DEPLOYMENT LOGIC            #
#######################################

deploy:
ifeq ($(NETWORK),anvil)
	forge script $(SCRIPT) \
		--rpc-url $(ANVIL_RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--broadcast
endif

ifeq ($(NETWORK),sepolia)
	forge script $(SCRIPT) \
		--rpc-url $(SEPOLIA_RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--broadcast \
		--verify \
		--etherscan-api-key $(ETHERSCAN_API_KEY)
endif

ifeq ($(NETWORK),lisk)
	forge script $(SCRIPT) \
		--rpc-url $(LISK_RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--broadcast \
		--verify \
		--verifier blockscout \
	  	--verifier-url https://blockscout.lisk.com/api? \
		--etherscan-api-key $(ETHERSCAN_API_KEY)
		-vvvv
endif

ifeq ($(NETWORK),mainnet)
	forge script $(SCRIPT) \
		--rpc-url $(MAINNET_RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--broadcast \
		--verify \
		--etherscan-api-key $(ETHERSCAN_API_KEY)
endif

#######################################
#         CONTRACT VERIFICATION       #
#######################################

verify:
ifeq ($(NETWORK),sepolia)
	forge verify-contract \
		--chain-id 11155111 \
		--etherscan-api-key $(ETHERSCAN_API_KEY) \
		$(ADDRESS) \
		src/YourContract.sol:YourContract
endif

ifeq ($(NETWORK),mainnet)
	forge verify-contract \
		--chain-id 1 \
		--etherscan-api-key $(ETHERSCAN_API_KEY) \
		$(ADDRESS) \
		src/YourContract.sol:YourContract
endif

fork-test:
	forge test --fork-url $(SEPOLIA_RPC_URL)


# forge verify-contract \
#   <CONTRACT_ADDRESS> \
#   ./src/<CONTRACT_FILE>.sol:<CONTRACT_NAME> \
#   --chain 1135 \
#   --watch \
#   --verifier blockscout \
#   --verifier-url https://blockscout.lisk.com/api? 
# Replace <CONTRACT_ADDRESS> with the actual deployed contract address.
# Replace ./src/<CONTRACT_FILE>.sol:<CONTRACT_NAME> with the correct path and contract name (e.g., ./src/NFT.sol:NFT).
# Use --chain 1135 for the Lisk Mainnet or --chain 4202 for Lisk Sepolia Testnet. 
# The --verifier-url must end with /api? (required for Blockscout).  


# forge verify-contract \     
#   --rpc-url https://rpc.sepolia-api.lisk.com \
#   --verifier blockscout \
#   --verifier-url 'https://sepolia-blockscout.lisk.com/api/' \
#   [0xContractAddress] \
#   src/[ContractFile]:[ContractName]



# Verify During Deployment (Recommended)
# You can also verify the contract at deployment time using forge create with the --verify flag:

# forge create \
#   --rpc-url https://rpc.api.lisk.com \
#   --private-key <PRIVATE_KEY> \
#   --verify \
#   --verifier blockscout \
#   --verifier-url https://blockscout.lisk.com/api? \
#   --etherscan-api-key <ETHERSCAN_API_KEY> \
#   src/NFT.sol:NFT

# This deploys and verifies the contract in one step.
# You must provide a valid --private-key and --etherscan-api-key (used by Blockscout for verification). 