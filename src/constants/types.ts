export const TYPES = {
    DatabaseService: Symbol.for('DatabaseService'),
    DatabaseConnection: Symbol.for('DatabaseConnection'),
    
    UserService: Symbol.for('UserService'),
    UserFactory: Symbol.for('UserFactory'),

    AuthMiddleware: Symbol.for('AuthMiddleware'),
    AdminMiddleware: Symbol.for('AdminMiddleware')

}