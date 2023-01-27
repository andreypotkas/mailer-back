export interface IIMapMessage {
    date: string
    from: IIMapMessageMember[]
    messageId: string
    replyTo: IIMapMessageMember[]
    sender: IIMapMessageMember[]
    subject : string
    to: IIMapMessageMember[]
    
    }
    
export interface IIMapMessageMember {
    name: string
    address: string
}