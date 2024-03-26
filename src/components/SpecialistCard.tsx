"use client";

import { User } from "@/types";
import { useRouter } from "next/navigation";
import {
    Box,
    Stack,
    Typography,
} from "@mui/material";
import {Chat } from "@mui/icons-material";

export interface PacientSpecialists extends User {
  nextHealthQueryDate: string;
}
interface SpecialistCardProps {
    user: PacientSpecialists;
    pacientId: string;
}

export default function SpecialistCard({
    user,
    pacientId
}: SpecialistCardProps) {
    const router = useRouter();

    const handleRouter = (e: any) => {
        console.log(e);
        console.log(pacientId);
        console.log(user.userId);
        router.push(`/chat/${user.userId}?name=${user.name}`)
    };
    return (
      <Box
          className="bg-white shadow-base rounded-3xl w-full p-8 cursor-pointer"
      >
          <Stack direction="row" justifyContent="space-between">
              <Box className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                      <div className="flex-col">
                          <Typography variant="h6" color="primary" fontWeight="bold">
                              {user.name}
                          </Typography>
                          <div className="flex flex-col">
                              <Typography variant="caption" className="text-gray-400">
                                  {user.especialty}
                              </Typography>
                              <Typography variant="caption" className="text-gray-400">
                                  Proxima Consulta: {user.nextHealthQueryDate}
                              </Typography>
                          </div>
                      </div>
                  </div>
                  <Chat className="text-gray-400" onClick={handleRouter}/>
              </Box>
          </Stack>
      </Box>
  );
}
