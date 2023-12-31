'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { signIn, signOut, useSession } from 'next-auth/react'

const Links = ['Dashboard', 'Projects', 'Team']

const NavLink = (props) => {
  const { children } = props

  return (
    <Box
    fontWeight={600}
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'underline'
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {data:session} = useSession()
  console.log(session)
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              {
                session?.user ? (
                  <Button 
                  bg="transparent"
                  border='gray.200'
                  _hover={{
                    bg:'white',
                    color:'black'
                  }}
                  mr={5} onClick={()=>{signOut()}}>
                    Sign out
                  </Button>
                
                ):(
                  <Button 
                  bg="transparent"
                  border='gray.200'
                  _hover={{
                    bg:'white',
                    color:'black'
                  }}
                  mr={5} onClick={()=>{signIn()}}>
                    Sign in
                  </Button>
                )
              }
             
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={session && session?.user?.image}
                  alt={'Home'}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

    </>
  )
}