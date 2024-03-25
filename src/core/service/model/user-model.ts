export interface UserModel {
  activated: boolean;
  authorities: string[];
  createdBy: string;
  createdDate: string;
  email: string;
  expiredDate: string
  firstName: string;
  fullName: string;
  id: number;
  imageUrl: string;
  langKey: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  lastName: string;
  login: string;
}
