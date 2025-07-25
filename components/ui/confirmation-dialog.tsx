'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { motion } from 'framer-motion'

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-800/20"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-gray-100">{title}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose} className="rounded-lg">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
