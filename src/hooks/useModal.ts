'use client'

import React from 'react'

import { ModalContext } from '@/contexts/ModalContext'

export const useModal = () => React.useContext(ModalContext)
