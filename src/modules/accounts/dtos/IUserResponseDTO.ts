interface IUserResponseDTO {
  name: string;
  email: string;
  id: string;
  driver_license: string;
  avatar: string;
  getAvatarUrl(): string;
}

export default IUserResponseDTO;
